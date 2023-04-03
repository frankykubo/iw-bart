# Bart.sk - Interview Jakub Frankovic | Task 1

Táto vetva obsahuje implementáciu frontendového zadania čislo 1.

V rámci vývoja som si pomohol _Vite_ knižnicou, ktorá ponúka funkciu Hot reloadingu a veľmi spríjemňuje lokálny vývoj.

Grafický návrh bol spracovaný do dvoch HTML súborov - _index.html_ a _gallery.html_. Ako je možné predpokladať, index obsahuje Homepage a Gallery obsahuje stránku samotnej galérie s obrázkami. Šablóny boli vyvíjané responzívne. V súbore _main.ts_ je implementovaná logika pre zobrazenie modalov, aby bol tento základný návrh aspoň z časti interaktívny.
Rovnako tak sa viete na samotnú galériu prekliknúť priamo z indexu a opačne.

Na štýlovanie bol použitý preprocessor <b>Sass</b> a libka <b>tailwindcss</b>, ktorá v rámci produkovania výsledného CSS súboru a purgingu nepoužitých classes využíva postcss a autoprefixer.
