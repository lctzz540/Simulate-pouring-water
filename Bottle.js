class Bottle {
  constructor(x, full, lid) {
    this.x = x;
    this.w = 50;
    this.h = this.w / 3;
    this.lid = lid;
    this.full = full;
    this.empty = this.full + 80;
    this.yc = this.empty;
    this.yr = 0.4375 * ((this.empty - this.yc) / 100);
    this.wc = this.w + this.w * this.yr;
    this.hc = this.h + this.h * this.yr;
    this.ly = this.full - 47 - 100;
    this.secondLine = this.full + 200;
  }

  move() {
    if (this.x > width && this.full != this.secondLine) {
      this.full = this.secondLine;
      this.empty = this.full + 80;
      this.yc = this.full;
      this.yr = 0.4375 * ((this.empty - this.yc) / 100);
      this.wc = this.w + this.w * this.yr;
      this.hc = this.h + this.h * this.yr;
      this.ly = this.full - 47 - 100;
      inSecondline += 1;
    }
    if (this.full != this.secondLine) {
      this.x += 1;
    } else {
      this.x -= 1;
    }
  }
  async fillWater() {
    if (this.yc > this.full && this.full != this.secondLine) {
      this.yc -= 0.5;
      this.yr = 0.4375 * ((this.empty - this.yc) / 100);
      this.wc = this.w + this.w * this.yr;
      this.hc = this.h + this.h * this.yr;
    }
  }

  async closeTheLid() {
    fill("blue");
    rect(this.x - this.w * 0.3, this.ly, this.w * 0.59, this.h * 0.7);
    if (this.ly < this.full - 47) {
      this.ly += 1;
    } else {
      this.lid = true;
    }
  }
  display() {
    noStroke();
    fill("GhostWhite");
    ellipse(this.x, this.empty, this.w, this.h);
    beginShape();
    vertex(this.x - this.wc / 2, this.yc);
    vertex(this.x + this.wc / 2, this.yc);
    vertex(this.x + this.w / 2, this.empty);
    vertex(this.x - this.w / 2, this.empty);
    endShape(CLOSE);
    fill("white");
    ellipse(this.x, this.yc, this.wc, this.hc);
    strokeWeight(4);
    stroke("#B2DFE9");
    fill(255, 255, 255, 80);
    beginShape();
    vertex(this.x - this.w / 2, this.empty);
    vertex(this.x - (this.w * 1.35) / 2 + 1, this.full);
    vertex(this.x - (this.w * 1.35) / 2 + 1 + 20, this.full - 40);
    vertex(this.x + (this.w * 1.35) / 2 - 1 - 20, this.full - 40);
    vertex(this.x + (this.w * 1.35) / 2 - 1, this.full);
    vertex(this.x + this.w / 2, this.empty);
    endShape();
    arc(this.x, this.empty, this.w, this.h, 0, PI, OPEN);
    fill("#4FADC5");
    ellipse(this.x, this.full - 40, this.w * 0.5, this.h * 0.5);
    if (this.lid == true) {
      fill("blue");
      rect(this.x - this.w * 0.3, this.full - 47, this.w * 0.59, this.h * 0.7);
    }
  }
}
