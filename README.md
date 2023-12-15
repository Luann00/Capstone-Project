**Präferenzabfrage-Tool**
<br>
<br>
<br>


<!--Logo--->
<div align="center">
    <img class="logo" src="./public/WiSo-Logo.png" alt="Logo">
  </a>
  <h3 align="center">Vorgelegt von Team 3</h3>
</div>

 <h4>Das Auslandssemester-Präferenztool ist eine interaktive Plattform, die es Studierenden ermöglicht, ihre bevorzugten Partneruniversitäten für das MESS-Bachelor-Auslandssemester auszuwählen. Das Tool optimiert die Zuteilung der Studierenden auf die verfügbaren Plätze an den Partneruniversitäten unter Berücksichtigung ihrer individuellen Präferenzen. Gleichzeitig gewährleistet es Transparenz im Auswahlprozess und ermöglicht es den Admins, Auswahlverfahren zu gestalten und diese zu bearbeiten.</h4>


<h2>Wichtiges beim Klonen</h2>
Bei dieser Entwicklung wurde mit einer lokalen SQL Datenbank gearbeitet. Beim Klonen muss dies unbedingt beachtet werden und eine eigene Datenbank erstellt werden, damit die Daten, die man z.B in den Whitelists erstellt, auch nach dem Schließen der App noch gespeichert werden. Anschließend muss man die jeweiligen URL-Stellen im Code durch die URL der eigenen Datenbank ersetzen.
<br>
Außerdem muss die Datenbank(welche man in dem Ordner "DatenBank" im Spring Boot Ordner starten kann) <strong>separat gestartet werden!</strong> Dies geht, in dem man die Main Klasse im src Ordner startet. 
Ansonsten bekommt man bei der App Fetch Errors und man kann keine CRUD Operationen(Erstellen, Hinzufügen, Löschen und Bearbeiten) ausführen.

<h2>Wichtiges bezüglich der Seiten</h2>
Da wir immer noch keine LDAP-Authentifizierung implementiert haben, können wir noch keine Login Funktion implementieren. Beim ersten Starten der Applikation sieht man als Erstes die Login Page, die jedoch noch keine Funktionalitäten bestizt. Um dennoch auf die verschiedenen Seiten gehen zu können(z.B die Tabellen der Admins oder die erste Ansicht der Studierende), so kann man im Source Code in der App.jsx machen, in dem man die States "isLoggedIn" und "isAdmin" entsprechend verändert:
Ist nur "isLoggedIn" auf true gesetzt, so sieht man die Studentensicht, wo der Student die Cards wählen kann. Hier existieren noch keine Funktionen, diese werden erst in den nächsten Sprints implementiert. Ist sowohl "isLoggedIn" als auch "isAdmin" true, so kommt man auf die Admin Sicht. Hier funktioniert auch die Navbar und man kann durch die verschiedenen Seiten gehen. Ist beides False, so kommt man auf die Log-In Page(die noch keine Funktionalität hat).


<br>

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

