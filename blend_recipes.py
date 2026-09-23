"""Roasted blend recipes used by stock availability and delivery deductions."""

import json
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path


SOURCE_ARABICA = "100% Arabica Blend"
SOURCE_ROBUSTA = "100% Robusta Blend"
_RECIPES = json.loads(
    (Path(__file__).resolve().parent / "data" / "blend_mapping.json").read_text(encoding="utf-8")
)["roasted_blends"]
_BY_NAME = {row["name"].casefold(): row for row in _RECIPES}


def roasted_blend_catalog_name(name: str) -> str | None:
    """Return the canonical catalog name only for an explicitly mapped blend."""
    row = _BY_NAME.get(name.strip().casefold())
    return row["name"] if row else None


def blend_components(name: str, quantity: Decimal) -> dict[str, Decimal] | None:
    """Return source-stock demands for a blended item, or None for normal stock.

    Pure 100% items are physical source stock and are deducted directly.
    Quantities match the two-decimal precision of the inventory schema.
    """
    row = _BY_NAME.get(name.strip().casefold())
    if row is None or row["name"] in {SOURCE_ARABICA, SOURCE_ROBUSTA}:
        return None
    if "same_recipe_as" in row:
        row = _BY_NAME[row["same_recipe_as"].casefold()]
    amount = Decimal(str(quantity)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    arabica = (amount * Decimal(row["arabica_percent"]) / 100).quantize(
        Decimal("0.01"), rounding=ROUND_HALF_UP
    )
    robusta = amount - arabica
    return {key: value for key, value in ((SOURCE_ARABICA, arabica), (SOURCE_ROBUSTA, robusta)) if value}
