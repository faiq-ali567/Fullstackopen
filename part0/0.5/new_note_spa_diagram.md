sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>server: saves the note
    server-->>browser: HTTP 201 Created
    deactivate server

    Note right of browser: JavaScript updates the notes list without reloading the page
