(function () {
  try {
    // Class-based theming:
    // - Tailwind/shadcn: `html.dark`
    // - Legacy CSS variables: `html.light-theme`
    var theme = null;
    try {
      theme = localStorage.getItem('theme'); // 'dark' | 'light' | null
    } catch (e) {
      theme = null;
    }
    // If the user hasn't chosen, respect system preference.
    var prefersDark = false;
    try {
      prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      prefersDark = false;
    }
    var isDark = theme ? theme === 'dark' : prefersDark;
    var root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light-theme');
    } else {
      root.classList.remove('dark');
      root.classList.add('light-theme');
    }
  } catch (e) {}
})();
