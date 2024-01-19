**Präferenzabfrage-Tool**
<br>
<br>
<br>


<!--Logo--->
<div align="center">
    <img class="logo" src="./public/WiSo-Logo.png" alt="Logo">
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

### User Rollen

Es gibt 2 User Rollen: Der Admin und der Student. Der Admin kann das ganze Auswahlverfahren starten sowie steuern, während der Student die Präferenzen für seine Univeristät setzen kann. Im Nachfolgenden werden diese beiden User Rollen beschrieben und was diese konkret machen können.

Admin
Nach der Anmeldung als Admin landet man zunächst auf die Homepage des Admins. Hier sieht der Admin auf einen Blick den aktuellen Stand des Auswahlverfahrens:

### User Daten einfügen
Da wir keine LDAP-Authentifizierung haben, müssen zuerst die Benutzerdaten manuell in die Datenbank eingefügt werden. Zuerst muss man die die Admin Daten hinzuzufügen. Nachdem man sich dann als Admin angemeldet haben, kann man in der Admin-Ansicht die Studentendaten in der Studenten Tabelle einfügen.

**Wichtig:** Diese Anwendung geht davon aus, dass Admins und Benutzer unterschiedliche Benutzernamen/IDs haben. Wenn beide Objekte der jeweiligen Benutzergruppe dieselbe ID haben, wird man als Student angemeldet, da die Software zuerst den Studenten überprüft.

#### Schritte:

1. Verwende den Endpunkt [http://localhost:8081/admin](http://localhost:8081/admin), um die Daten für den Administrator einzufügen. Dies kann beispielsweise mit der Software Postman erfolgen. Die folgenden Variablen sind in dieser Tabelle vorhanden:
   - `uniKim`
   - `name`
   - `surname`
   - `title`
   - `sex`
   - `email`

**Wichtig:** Besonders wichtig ist `uniKim`, da dies für die Überprüfung des Benutzernamens beim Login verwendet wird. Der Rest der Variablen kann auf null bleiben, nur die uniKim ist wichtig.

2. Verwende den Endpunkt [http://localhost:8081/whitelistAdmin](http://localhost:8081/whitelistAdmin), um die pkz des Admins einzutragen. Dies kann ebenfalls mit Postman erfolgen. Die folgenden Variablen sind in dieser Tabelle vorhanden:
   - `pkz`
   - `year`

**Wichtig:** Hierbei ist vor allem `pkz` wichtig, da dies für die Überprüfung des Benutzernamens beim Login verwendet wird. Das Jahr kann frei bleiben, es wird dennoch empfohlen, dieses zu setzen.

Es ist hierbei wichtig, dass sowohl `uniKim` in `admin` als auch `pkz` in `whitelistAdmin` den gleichen Wert besitzen, da das Programm voraussetzt, dass der Admin in der Datenbank existiert und dieser auch in der Whitelist eingetragen ist.

3. Nun kann man sich als Admin anmelden. Dort kann man in der Seite "Students" und in der Seite "WhitelistStudent" die Studentendaten einfügen. Auch hier muss die Matrikelnummer identisch sein, damit sich der Student anmelden kann.





<br>
<br>
<br>
<br>

### Beteiligte Personen/Entwicklerteam
* Luan Zekiri
* Ha Hong Nguyen
* Maria Carpet
<br>
<brS>

