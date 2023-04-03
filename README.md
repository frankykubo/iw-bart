# Bart.sk - Interview Jakub Frankovic | Task 2 & 3

Táto vetva obsahuje vypracované zadanie 2 a 3, ktoré mi boli doručené po pracovnom pohovore. Rozhodol som sa tieto 2 úlohy spojiť, keďže implementovať projekt vo Vue bez pripojenia na API a neskôr s pripojením na reálne dáta by bola sizyfovská práca s minimálnymi rozdielmi. Verím, že je to pochopiteľné aj vzhľadom na môj aktuálny voľný čas.

V rámci mojej implementácie môžete nájsť všetkú funkcionalitu, ktorú webová appka Fotogaléria potrebuje. Na dizajn bola použitá externá knižnica <b>tailwindcss</b>, ktorú som spomínal už na technickom screeningu. Ako package manager npm knižníc som využil <b>pnpm</b>, ktoré využívam už zo zvyklosti, keďže si dokáže libky nacache-ovať a tým pádom opakovaná inštalácia netrvá tak dlho. Keďže sa objavili problémy pri použití elementu _<router-view \/>_ pod _\<Suspense \/>_ (kvôli asynchrónnym komponentom), musel som využiť libku na pracovanie so stavmi - <b>Pinia</b>, kde mám príznak, ktorý hovorí o tom, či sa aktuálne načítava stránka.

Ako už bolo spomenuté, ako framework som použil Vue 3 spolu s TypeScriptom. Využité boli SFC komponenty (najmodernejšia syntax). Okrem spomínaných knižníc bolo všetko implementované takpovediac od piky - modaly, inputy, animácie, responzivita.

Responzivita webu bola testovaná na intervale šírky obrazovky od 320px do 2500px.

<br>
Zadanie obsahuje nasledovnú funkcionalitu:

- Zobrazenie galérií (kategórií)
- Vytvorenie galérie (kategórie)
- Zmazanie galérie (kategórie)
- Asynchrónne komponenty (na základe čoho využitý skeleton)
- Zobrazenie galérie a jednotlivých obrázkov
- Vymazanie jednotlivých obrázkov
- Upload pomocou natívneho uploadera alebo pomocou drag & drop
- Ukazovatele stavov (napr. progress bar pri uploade)
- Pri niektorých akciách boli naschvál pridané nejake delaye, aby bolo vidieť postup (napr upload obrázkov)
- routing
- 404 stránku

## IDE Setup

Na vývoj som použil, ako aj samotný tým Vue odporúča, [VSCode](https://code.visualstudio.com/) + extension [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

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
