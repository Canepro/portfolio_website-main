(function () {
  try {
    // Class-based theming:
    // - Tailwind/shadcn: `html.dark`
    // - Legacy CSS variables: `html.light-theme`
    var theme = localStorage.getItem('theme'); // 'dark' | 'light' | null
    var prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = theme ? theme === 'dark' : !!prefersDark;
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

