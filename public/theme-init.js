(function () {
  try {
    // Class-based theming:
    // - Tailwind/shadcn: `html.dark`
    // - Legacy CSS variables: `html.light-theme`
    var theme = localStorage.getItem('theme'); // 'dark' | 'light' | null
    // Dark-first: if the user hasn't chosen, default to dark.
    var isDark = theme ? theme === 'dark' : true;
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
