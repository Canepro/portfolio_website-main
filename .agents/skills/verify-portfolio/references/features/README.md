# Reader feature map

Sweep in this order. Each entry runs at 1440x900 and 390x844, in dark and
light themes. The wrapper requires all 40 captured states.

1. [Home and navigation](navigation.md): home, theme-toggle, mobile-menu, menu-navigation.
2. [Projects](projects.md): projects, case-study.
3. [Writing](writing.md): blog, topic-filter, article.
4. [Archive](archive.md): systems.
5. [Contact](contact.md): contact (read only).

Every capture checks a visible main heading, horizontal overflow (at most 2px),
loaded visible images, and browser runtime errors. Route contracts also check
all discovered project/article URLs, selected metadata, the missing-page 404,
and retired deployment links. Read contracts.log for the exact assertions.
The browser clicks one case study and one article; HTTP coverage of the others
does not prove their interactive behavior. Failed-response observations need
review even when they do not produce an automated candidate.

For drift, compare selectors with current source before changing expectations.
Do not omit a broken mapped feature to obtain PASS. Add new important journeys
and update the wrapper's completeness guard together with the feature map.
