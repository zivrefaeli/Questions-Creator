const letters = 'אבגדהוזחטיכלמנסעפצקרשתםףךץן'.split('');
for (let i = 32; i < 127; i++)
    letters.push(String.fromCharCode(i));

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function downloadToFile(content) {
    const key = random(1, letters.length - 1);
    content += 'Created by: Ziv Refeali';
    const encodeContent = encode(content, key);
    const filename = `QC-${key}`;

    const a = document.createElement('a');
    const file = new Blob([encodeContent], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}

function encode(content, key) {
    let result = '';
    String(content).split('').forEach(char => {
        if (letters.includes(char)) {
            result += letters[(letters.indexOf(char) + key) % letters.length];
        } else {
            result += char;
        }
    });
    return result;
}

function decode(content, key) {
    let result = '';
    String(content).split('').forEach(char => {
        if (letters.includes(char)) {
            result += letters[(letters.indexOf(char) - key + letters.length) % letters.length];
        } else {
            result += char;
        }
    });
    return result;
}