(function () {
  const form = document.querySelector('[data-roast-form]');
  if (!form) return;
  const source = form.querySelector('#green_id');
  const destination = form.querySelector('#roasted_id');
  const quantity = form.querySelector('#green_quantity');
  const preview = form.querySelector('[data-roast-preview]');
  function update() {
    const missing = !source.value || !destination.value;
    const unit = source.selectedOptions[0]?.dataset.unit || '';
    const targetUnit = destination.value === 'auto' ? unit : destination.selectedOptions[0]?.dataset.unit;
    const mismatch = !missing && unit !== targetUnit;
    form.querySelector('button[type="submit"]').disabled = missing || mismatch;
    destination.setCustomValidity(mismatch ? 'Choose a roasted bean with the same unit as the green bean.' : '');
    const amount = Number(quantity.value);
    preview.textContent = missing ? 'Select a green bean and its roasted counterpart. Yield: 85%.' : mismatch ? 'The source and destination must use the same unit.' :
      quantity.value && Number.isFinite(amount) && amount > 0 ?
        `${amount.toFixed(2)} ${unit} green → ${(Math.round((amount * 0.85 + Number.EPSILON) * 100) / 100).toFixed(2)} ${unit} roasted · 15% loss` :
        `Enter the green quantity. Roasted yield is 85% in ${unit}.`;
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  // A reload is needed to submit another batch, avoiding accidental double-clicks.
  form.addEventListener('submit', function () {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Recording roast…';
  });
  window.addEventListener('pageshow', function () {
    const button = form.querySelector('button[type="submit"]');
    button.textContent = 'Add Roasted Beans →';
    update();
  });
  update();
}());
