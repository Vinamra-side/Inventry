"""Pure catalog identity helpers shared by Zoho imports and stock displays."""

import re


def normalized_unit(value: object) -> str:
    unit = str(value or "").strip().casefold().rstrip(".")
    return {
        "kgs": "kg", "kilogram": "kg", "kilograms": "kg",
        "l": "l", "ltr": "l", "ltrs": "l", "litre": "l", "litres": "l",
        "liter": "l", "liters": "l",
    }.get(unit, unit)


def decoction_catalog_name(name: str, description: str = "") -> str | None:
    """Map a clear invoice ratio to a decoction item; never guess a ratio."""
    ratios = set(re.findall(r"(?<!\d)(?:\d{1,3}/\d{1,3}|100%)(?!\d)", f"{name} {description}"))
    if len(ratios) != 1:
        return None
    ratio = ratios.pop()
    if ratio == "100%":
        species = {match.casefold() for match in re.findall(
            r"\b(arabica|robusta)\b", f"{name} {description}", re.I
        )}
        if len(species) == 1:
            return f"Decoction 100% {species.pop().title()}"
        if species:
            return None
        return "Decoction 100%"
    if ratio not in {"70/30", "80/20"}:
        return None
    return f"Decoction {ratio}"
