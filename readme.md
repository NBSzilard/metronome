# Modern Metronome Web Application  
**Live Demo:** [example.com/metronome](https://example.com/metronome)  

A metronome web app with modern UI, featuring tempo control, visual/audio feedback, and multiple time signatures.

![Metronome Interface](https://szilard.nagy-brunner.hu/projects/metronome/metronome.png)

## 🚀 Features  
- **Tempo Control**: 30-200 BPM slider with real-time updates  
- **Tap Tempo** rhythm detection  
- **Time Signatures**: 2/4, 3/4, 4/4 support  
- **Dual Feedback**: Visual pulse + audio tones (880Hz/440Hz)  
- **Beat Accents**: First beat highlighting in measures  
- **Modern UI**: Smooth animations & minimalist design  

## ⚡ Quick Start  
1. Clone repo:  
   ```bash  
   git clone https://github.com/NBSzilard/metronome.git
   ```
2. Open index.html in any modern browser

## 🎚️ Usage  

| Element          | Functionality                      |  
|------------------|------------------------------------|  
| Tempo Slider     | Drag to set BPM (30-200 range)     |  
| Start/Stop       | Toggle playback (spacebar support) |  
| Tap Button       | Set tempo via rhythmic clicks      |  
| Time Signatures  | Switch between 2/4, 3/4, 4/4      |  

## 🛠️ Technical Stack

- Core: Vanilla JavaScript (ES6+)
- Audio Engine: Web Audio API
- Styling: CSS Grid/Flexbox + Custom Properties
- Performance: RequestAnimationFrame optimizations

## 📂 File Structure
```
/metronome
├── index.html            # Main app container
├── styles.css            # Responsive styling
└── script.js             # Metronome core logic
```