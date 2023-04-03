# Bart.sk - Interview Jakub Frankovic | Task 1

Táto vetva obsahuje implementáciu frontendového zadania čislo 1.

V rámci vývoja som si pomohol _Vite_ knižnicou, ktorá ponúka funkciu Hot reloadingu a veľmi spríjemňuje lokálny vývoj.

Grafický návrh bol spracovaný do dvoch HTML súborov - _index.html_ a _gallery.html_. Ako je možné predpokladať, index obsahuje Homepage a Gallery obsahuje stránku samotnej galérie s obrázkami. Šablóny boli vyvíjané responzívne. V súbore _main.ts_ je implementovaná logika pre zobrazenie modalov, aby bol tento základný návrh aspoň z časti interaktívny.
Rovnako tak sa viete na samotnú galériu prekliknúť priamo z indexu a opačne.

Na štýlovanie bol použitý preprocessor <b>Sass</b> a libka <b>tailwindcss</b>, ktorá v rámci produkovania výsledného CSS súboru a purgingu nepoužitých classes využíva postcss a autoprefixer.

<b>Táto časť je iba o naštýlovaní komponentov.</b> Funkčnú galériu s využitím práve týchto naštýlovaných komponentov môžete nájsť vo vetve [Task2-and-Task3](https://github.com/frankykubo/iw-bart/tree/Task2-and-Task3).

## Project Setup

```sh
npm i -g pnpm
pnpm install
```

### Spustenie dev servera

```sh
pnpm dev
```

### Kontrola typov, kompilácia a minifikácia pre production build

```sh
npm run build
```

Následne nahrať zložku dist na nejaký host server apache alebo nginx, nastaviť aby fungovalo vue-router History mode a aplikácia by mala frčať.
