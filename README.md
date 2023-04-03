# Bart.sk - Interview Jakub Frankovic

Vítam vás na mojom Githube. Nachádzate sa v hlavnej vetve repozitára, kde nájdete vypracované jednotlivé úlohy z frontendového zadania, ktoré mi bolo doručené po (nie ideálnom) technickom screeningu. Verím, že týmto vypracovaným zadaním vám napravím chuť a mienku o mojich schopnostiach, ktoré určite prevyšujú vytvorenie šachovnice.

Implementáciu som rozdelil do dvoch častí:

## Task 1

Vo vetve [Task1](https://github.com/frankykubo/iw-bart/tree/Task1) som implementoval krok 1, ktorý pozostával hlavne z vytvorenia šablón a podkladov pre ďalšie kroky.

## Task 2 & 3

Vo vetve [Task2-and-Task3](https://github.com/frankykubo/iw-bart/tree/Task2-and-Task3) je implementovaný krok 2 a krok 3, ktoré som sa rozhodol spojiť. O dôvodoch, prečo, som sa viac rozpísal priamo v danej vetve v README.

Verím, že sa vám zadanie bude páčiť a budem určite čakať na spätnú väzbu. Zadaniu som venoval času toľko, aby som ho:

1. Spravil kompletne
2. Bol spokojný
3. Malo nejakú pridanú hodnotu

## Možné vylepšenia

Samozrejme, je veľa vecí, s ktorými by sa dalo ísť viac do hĺbky a vylepšovať ich. V rámci frontendu by som určite v budúcnosti implementoval tieto prvky:

### 1. Caching

Pomocou libky <b>Pinia</b> by sa dalo spraviť jednoduché cache, kedy by sa dáta vždy po prvom requeste na API uložilo do stavu a pri následnom uživateľskom zobrazení by sa dáta brali odtiaľ, nie nanovo z API. To by zabezpečilo menšie vyťaženie servera.

### 2. Delete multiple images

V rámci galérie možnosť zvoliť viacero obrázkov a vymazať ich naraz.

### 3. Mikroanimácie

Použiť viacero mikroanimácií, aby web bol estetickejší a viac oslovil.

### 4. Usporiadanie fotografií

Možnosť usporiadať fotografie v galérii by možno niekoľko používateľov využilo. Samozrejme, k tomu by bolo nutné naprogramovať BE.

### 5. Sorting

Usporiadať galérie napr. podľa názvu, prípadne usporiadanie obrázkov na základe názvu, veľkosti, dátumu nahratia. Ako pri bode 4. platí, že by bolo nutné to naprogramovať na BE.

<b>V rámci backendu by som navrhol:</b>

### 1. POST Multiple images at once

Možnosť nahrať viaceré obrázky v jednom requeste by bola príjemná. Skúšal som to, avšak neúspešne, teda usudzujem, že to naprogramované nie je.

### 2. PUT /gallery/{path}

Možnosť upraviť meno galérie

### 3. Gallery cover

Možnosť zvoliť cover obrázok pre galériu namiesto prvého z obrázkov, ktoré galéria obsahuje.

### 4. Login

To už by bol postup na iný level - spraviť galériu, ktorá bude viazaná na používateľa. Príhlásenie, token, autorizácia.

## Záver

Na záver by som chcel poďakovať už len za príležitosť toto zadanie vypracovať a rovnako tak za to, že mu budete venovať ďalší čas. Implementácia tejto galérie je podľa môjho názoru dobrý ukazovateľ schopností programátora a dá sa ísť do hĺbky vo viacerých smeroch, ako som písal už vyššie. Jej vytváranie ma bavilo, hľadal som veci, ktoré by sa dali zlepšiť, skúšal som pridať niečo nové a samozrejme som chcel implementovať všetkú potrebnú funkcionalitu, čo sa v konečnom dôsledku podarilo.
