**Präferenzabfrage-Tool**
<br>
<br>
<br>


<!--Logo--->
<div align="center">
    <img class="logo" src="./public/WiSo-Button.ico" alt="Logo">
  </a>
</div>

 <h4>Das Auslandssemester-Präferenztool ist eine interaktive Plattform, die es Studierenden ermöglicht, ihre bevorzugten Partneruniversitäten für das MESS-Bachelor-Auslandssemester auszuwählen. Das Tool ermöglicht es den Studenten, ihre Präferenzen für ihe bevorzugte Univrsität für das Auslandssemester in absteigender Reihenfolge zu wählen. Gleichzeitig gewährleistet es Transparenz im Auswahlprozess und ermöglicht es den Admins, Auswahlverfahren zu gestalten und diese zu bearbeiten.</h4>


<h2>Wichtiges beim Klonen</h2>
Bei dieser Entwicklung wurde mit einer lokalen SQL Datenbank gearbeitet. Beim Klonen muss dies unbedingt beachtet werden und eine eigene Datenbank erstellt werden, damit die Daten, die man z.B in den Whitelists erstellt, auch nach dem Schließen der App noch gespeichert werden. Anschließend muss man die jeweiligen URL-Stellen im Code durch die URL der eigenen Datenbank ersetzen.
<br>
Außerdem muss die Datenbank(welche man in dem Ordner "DatenBank" im Spring Boot Ordner starten kann) <strong>separat gestartet werden!</strong> Dies geht, in dem man die Main Klasse im src Ordner startet. 
Ansonsten bekommt man bei der App Fetch Errors und man kann keine CRUD Operationen(Erstellen, Hinzufügen, Löschen und Bearbeiten) ausführen.

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

In diesem Abschnitt wird beschrieben, wie man das Projekt auf dem eigenen Rechner starten kann.

### Voraussetzungen

* npm
  ```sh
  npm install 

* Eine aufgesetzte mySQL Datenbank, mit der man stets verbunden ist. Bei dem Aufsetzen der Datenbank sollten die Variablen aus der Application.Properties Datei beachtet werden.


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
   Im Package DatenBank -> src -> java -> und dann DatenBankApplication.java starten
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


<h1>Applikation nutzen</h1>

### User Daten einfügen
Da wir keine LDAP-Authentifizierung haben, muss man als erstes die Userdaten selber in der Datenbank einfügen. Man muss zuerst die Admindaten einfügen. Danach kann man sich als Admin anmelden und in der Adminsicht die Studentendaten einfügen.
Wichtig: Es wird bei dieser Applikation davon ausgegangen, dass sowohl die Admins als auch die User verschiedene Usernamen/ID's haben. Haben beide Objekte der jeweiligen Usergruppe die selbe ID, so wird man als Student angemeldet, da die Software zuerst den Studenten überprüft.

Folgende Schritte können am Anfang durchgeführt werden:

1. Mit dem Endpoint http://localhost:8081/admin die Daten für den Admin eintragen. Dies kann beispielsweise durch die Software Postman erfolgen. Folgende Variablen existieren in dieser Tabelle:
<ul>
<li>uniKim</li>
<li>name</li>
<li>surname</li>
<li>title</li>
<li>sex</li>
<li>email</li>
</ul>
Wichtig ist hierbei vor allem uniKim, da dies für die Überprüfung des Usernames beim login verwendet wird.


2. Mit dem Endpoint http://localhost:8081/whitelistAdmin die pkz des Admins eintragen. Dies kann beispielsweise durch die Software Postman erfolgen. Folgende Variablen existieren in dieser Tabelle:
<ul>
<li>pkz</li>
<li>year</li>
</ul>
Wichtig ist hierbei vor allem pkz, da dies für die Überprüfung des Usernames beim login verwendet wird.


Es ist hierbei wichtig, dass sowohl uniKim in admin als auch pkz in whitelistAdmin  den selben Wert besitzen, da das Programm voraussetzt dass der Admin in der Datenbank existiert und dieser auch in der Whitelist eingetragen ist.

3. Nun kann man sich als Admin anmelden. Dort kann man in der Seite "Students" und in der Seite "WhitelistStudent" die Studentendaten einfügen. Auch hier muss die Matrikelnummer identisch sein, damit sich der Student anmelden kann.





### User Rollen
Es gibt 2 User Rollen: Der Admin und der Student. Der Admin kann das ganze Auswahlverfahren starten sowie steuern, während der Student die Präferenzen für seine Univeristät setzen kann.




### Beteiligte Personen/Entwicklerteam
* Luan Zekiri
* Ha Hong Nguyen
* Maria Carpet
<br>
<brS>

