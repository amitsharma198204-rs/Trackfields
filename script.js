document.addEventListener('DOMContentLoaded', () => {
  const qrCells = document.querySelectorAll('.qr-grid span');
  qrCells.forEach((cell, index) => {
    const pattern = [
      [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0]
    ];
    const row = Math.floor(index / 4);
    const col = index % 4;
    const visible = pattern[row][col] === 1;
    cell.style.opacity = visible ? '1' : '0.15';
    cell.style.background = visible ? '#0f355f' : 'transparent';
  });

  const counters = document.querySelectorAll('[data-target]');

  counters.forEach((counter) => {
    const target = Number(counter.getAttribute('data-target'));
    const suffix = counter.textContent.includes('₹') ? '₹ ' : '';
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      if (counter.classList.contains('payroll-total')) {
        counter.textContent = `₹ ${value.toLocaleString('en-IN')}`;
      } else {
        counter.textContent = value.toLocaleString('en-IN');
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (counter.classList.contains('payroll-total')) {
          counter.textContent = `₹ ${target.toLocaleString('en-IN')}`;
        } else {
          counter.textContent = target.toLocaleString('en-IN');
        }
      }
    }

    requestAnimationFrame(update);
  });
});
