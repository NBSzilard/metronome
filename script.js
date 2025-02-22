class Metronome {
    constructor() {
        this.audioContext = null
        this.oscillator = null
        this.gainNode = null
        this.isRunning = false
        this.bpm = 120
        this.beatsPerMeasure = 4
        this.currentBeat = 0
        this.timer = null
        
        this.initializeElements()
        this.initializeEventListeners()
        this.initializeAudio()
    }

    initializeElements() {
        this.bpmDisplay = document.getElementById('bpm')
        this.tempoSlider = document.getElementById('tempo')
        this.startStopBtn = document.getElementById('startStop')
        this.tapBtn = document.getElementById('tap')
        this.visualIndicator = document.getElementById('visual')
        this.signatureBtns = document.querySelectorAll('.signature-btn')
    }

    initializeEventListeners() {
        this.tempoSlider.addEventListener('input', (e) => {
            this.bpm = e.target.value
            this.updateDisplay()
        })

        this.startStopBtn.addEventListener('click', () => {
            this.toggle()
        })

        this.tapBtn.addEventListener('click', () => {
            this.handleTapTempo()
        })

        this.signatureBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.signatureBtns.forEach(b => b.classList.remove('active'))
                btn.classList.add('active')
                this.beatsPerMeasure = parseInt(btn.dataset.beats)
            })
        })
    }

    initializeAudio() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        this.gainNode = this.audioContext.createGain()
        this.gainNode.connect(this.audioContext.destination)
        this.gainNode.gain.value = 0.5
    }

    toggle() {
        this.isRunning ? this.stop() : this.start()
    }

    start() {
        if (!this.audioContext) this.initializeAudio()
        this.isRunning = true
        this.startStopBtn.textContent = 'Stop'
        this.scheduleBeats()
    }

    stop() {
        this.isRunning = false
        this.startStopBtn.textContent = 'Start'
        clearTimeout(this.timer)
        this.currentBeat = 0
        this.visualIndicator.classList.remove('active')
    }

    scheduleBeats() {
        if (!this.isRunning) return

        const interval = 60000 / this.bpm
        const startTime = this.audioContext.currentTime + 0.1

        this.playSound(this.currentBeat === 0 ? 800 : 400)
        this.animateVisual()

        this.currentBeat = (this.currentBeat + 1) % this.beatsPerMeasure

        this.timer = setTimeout(() => this.scheduleBeats(), interval)
    }

    playSound(frequency) {
        if (this.oscillator) this.oscillator.stop()
        
        this.oscillator = this.audioContext.createOscillator()
        this.oscillator.connect(this.gainNode)
        this.oscillator.type = 'square'
        this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
        this.oscillator.start()
        this.oscillator.stop(this.audioContext.currentTime + 0.1)
    }

    animateVisual() {
        this.visualIndicator.classList.add('active')
        setTimeout(() => {
            this.visualIndicator.classList.remove('active')
        }, 100)
    }

    updateDisplay() {
        this.bpmDisplay.textContent = this.bpm
    }

    handleTapTempo() {
        const now = Date.now()
        if (!this.tapTimes) this.tapTimes = []
        this.tapTimes.push(now)

        if (this.tapTimes.length > 2) {
            const intervals = this.tapTimes
                .slice(-3)
                .map((t, i, arr) => i > 0 ? t - arr[i - 1] : 0)
                .slice(1)
            
            const averageInterval = intervals.reduce((a, b) => a + b) / intervals.length
            this.bpm = Math.round(60000 / averageInterval)
            this.tempoSlider.value = this.bpm
            this.updateDisplay()
        }

        setTimeout(() => {
            this.tapTimes = this.tapTimes.filter(t => t > Date.now() - 2000)
        }, 2000)
    }
}

const metronome = new Metronome()