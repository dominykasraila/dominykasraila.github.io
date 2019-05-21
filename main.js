VF = Vex.Flow;
var div = document.getElementById("vexflow")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
renderer.resize(100, 100);
var context = renderer.getContext();
var stave = new VF.Stave(0, 0, 100);
stave.addClef("treble");
stave.setContext(context).draw();
var currentNote = randomNoteNoRepeat();
showNote(currentNote);
var correctGuesses = 0;
var incorrectGuesses = 0;

function randomNoteNoRepeat() {
    if (typeof this.lastNote == 'undefined') {
        this.lastNote = "";
    }
    var note = "";
    do {
        note = randomNote();
    } while (this.lastNote == note);
    this.lastNote = note;
    return note;
}

function buttonClick() {
    showNote(randomNoteNoRepeat());
}

function showNote(note) {
    document.getElementById('bar').innerHTML = note;

    context.clear();
    var staveNotes = [
        new VF.StaveNote({
            clef: "treble",
            keys: [note],
            duration: "q"
        })
    ];
    voice = new VF.Voice({
        num_beats: 1,
        beat_value: 4
    });
    voice.addTickables(staveNotes);
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 100);
    stave.draw();
    voice.draw(context, stave);
}

function randomNote() {
    var notes = ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'];
    return randomArrayElement(notes);
}

function randomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function keyboardPress(e) {
    var noteName = e.getAttribute("id");
    var notes = {
        c: 'c/4',
        d: 'd/4',
        e: 'e/4',
        f: 'f/4',
        g: 'g/4',
        a: 'a/4',
        b: 'b/4'
    };
    if (Object.keys(notes).includes(noteName)) {
        checkNote(notes[noteName]);
    }
}

function checkNote(note) {
    if (note[0] == currentNote[0]) {
        currentNote = randomNoteNoRepeat();
        showNote(currentNote);
        document.getElementById("correctGuesses").innerHTML = ++correctGuesses;
    } else {
        document.getElementById("incorrectGuesses").innerHTML = ++incorrectGuesses;
    }
}