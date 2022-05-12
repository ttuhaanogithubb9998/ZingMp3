
class MyAudio {
    constructor(element, fftSize) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

        this.myAudio = this.audioContext.createMediaElementSource(element);

        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = fftSize;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.myAudio.connect(this.analyser);
        this.myAudio.connect(this.audioContext.destination);
    }

    getSamples() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSample = [...this.dataArray].map(e => e / 128 - 1);
        return normSample;
    }

    getSubSamples(){
        this.analyser.getByteFrequencyData(this.dataArray);
        let normSample = [...this.dataArray].map(e => e / 128 - 1);
        return normSample;
    }
    getVolume() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSample = [...this.dataArray].map(e => e / 128 - 1);
        let sum = 0;
        for (let i = 0; i < normSample.length; i++) {
            sum += normSample[i] * normSample[i];
        }
        return Math.sqrt(sum / normSample.length);
    }

}
export default MyAudio