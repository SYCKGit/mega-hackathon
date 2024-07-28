export class AnimationQueue {
  constructor(timing) {
    this.timing = timing;
    this.queue = [];
    this.running = false;
  }

  push(el, callback) {
    this.queue.push([el, callback]);
    if (!this.running)
      this.execute();
  }

  execute() {
    if (this.queue.length === 0){
      this.running = false;
      return;
    }
    this.running = true;
    const [el, callback] = this.queue.shift();
    if (el.isNode())
      el.animate({style: { "background-color": "#03346E" }, duration: this.timing});
    else if (el.isEdge())
      el.animate({style: { "line-color": "#03346E", "target-arrow-color": "#03346E" }, duration: this.timing});
    if (callback) callback(el, this.timing);
    setTimeout(() => this.execute(), this.timing * 2);
  }
}

export function searchAnimation(algo) {
  return (cy, startNode, isDirected) => {
    const result = cy.elements()[algo](`#${startNode}`, () => {}, isDirected);
    const queue = new AnimationQueue(500);
    for (const el of result.path)
      queue.push(el);
  }
};