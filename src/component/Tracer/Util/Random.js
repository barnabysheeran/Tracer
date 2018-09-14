// Seed Random with int
export function initRNG(seed) {
  Math._seed = seed;

  Math.next = function() {
    return (this._seed = (this._seed * 16807) % 2147483647);
  };

  Math.random = function() {
    return (this.next() - 1) / 2147483646;
  };
}

export function reSeedRNG(seed) {
  Math._seed = seed;
}
