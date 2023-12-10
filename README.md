**Präferenzabfrage-Tool**
<br>
<br>
<br>



<h2>Wichtiges beim Klonen</h2>
Bei dieser Entwicklung wurde mit einer lokalen SQL Datenbank gearbeitet. Beim Klonen muss dies unbedingt beachtet werden und eine eigene Datenbank erstellt werden, damit die Daten, die man z.B in den Whitelists erstellt, auch nach dem Schließen der App noch gespeichert werden. Anschließend muss man die jeweiligen URL-Stellen im Code durch die URL der eigenen Datenbank ersetzen.
<br>
Außerdem muss die Datenbank(welche man in dem Ordner "DatenBank" im Spring Boot Ordner starten kann) <strong>separat gestartet werden!</strong> Dies geht, in dem man die Main Klasse im src Ordner startet. 
Ansonsten bekommt man bei der App Fetch Errors und man kann keine CRUD Operationen(Erstellen, Hinzufügen, Löschen und Bearbeiten) ausführen.

<h2>Wichtiges bezüglich der Seiten</h2>
Da wir immer noch keinen Zugriff auf den LDAP-Server des RRZK haben(das RRZK hat dies, so ist der Stand heute am letzten Tag von Sprint 2, das Problem leider immer noch nicht gelöst), können wir noch keine Login Funktion implementieren. Beim ersten Starten der Applikation sieht man als Erstes die Login Page, die jedoch noch keine Funktionalitäten bestizt(aufgrund des fehlenden LDAP-Zugangs). Um dennoch auf die verschiedenen Seiten gehen zu können(z.B die Tabellen der Admins oder die erste Ansicht der Studierende), so kann man im Source Code in der App.jsx machen, in dem man die States "isLoggedIn" und "isAdmin" entsprechend verändert:
Ist nur "isLoggedIn" auf true gesetzt, so sieht man die Studentensicht, wo der Student die Cards wählen kann. Hier existieren noch keine Funktionen, diese werden erst in den nächsten Sprints implementiert. Ist sowohl "isLoggedIn" als auch "isAdmin" true, so kommt man auf die Admin Sicht. Hier funktioniert auch die Navbar und man kann durch die verschiedenen Seiten gehen. Ist beides False, so kommt man auf die Log-In Page(die noch keine Funktionalität hat).


<br>

<h2>Dokumentation</h2>
Im Wiki haben wir die verschiedensten Sachen(Meetings, Dailies, Probleme bei der Entwicklung ect.) dokumentiert und verweisen bei Fragen zuerst auf das Wiki. Im Wiki wurden Sachen dokumentiert wie Änderungen am Backlog(die sich in der Mitte des Sprints ergeben haben) oder aber auch allgemeine Probleme während der Sprints und der daraus resultierenden Folgen.


<br>
<br>

### Benutzte Technologien
[![My Skills](https://skillicons.dev/icons?i=html,css,js,react,java,spring)](https://skillicons.dev)<br>
<br>
Als CSS Framework haben wir uns für React-Bootstrap entschieden, da dieses Framework über eine sehr umfangreiche Dokumentation verfügt und so optimal für ansprechende Website Designs ist.

<br>
<br>
<!-- GETTING STARTED -->
<h1>Applikation aufsetzen</h1>

In diesem Abschnitt wird beschrieben, wie man das Projekt auf dem eigenen lokalen Rechner starten kann.

### Voraussetzungen

* npm
  ```sh
  npm install 

* Eine eigene aufgesetzte (mySQL) Datenbank. Folgende Werte in der Application.Properties Datei sollten durch die eigenen Datenbank Werte geändert werden:
  ```sh
   spring.datasource.username=
   spring.datasource.password= 


### Installation

1. Repository klonen
   ```sh
   git clone https://gitlab.com/ciis-capstone-project/winter-2023-2024/team-03 praeferenzabfrage-tool.git
   ```
2. In das Hauptverzeichnis gehen
   ```sh
   cd praeferenzabfrage-tool
   ```
   
3. NPM Packages installieren
   ```sh
   npm install

5. Datenbank starten
   ```js
   Im Package DatenBank -> src -> java -> und dann die Hauptklasse starten
   ```
4. Applikation starten
   ```js
   npm start
   ```
5. Applikation öffnen
   ```js
   localhost:3000 öffnen
   ```

<br>

### Beteiligte Personen/Entwicklerteam
* Luan Zekiri
* Liska Derkum
* Ha Hong Nguyen
* Maria Carpet
<br>
<brS>

