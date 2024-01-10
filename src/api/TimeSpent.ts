const MINUTES_IN_HOUR = 60;

export class TimeSpent {
  private totalMinutes: number;

  constructor(minutes?: number) {
    if (typeof minutes !== 'undefined') {
      this.totalMinutes = minutes;
    } else {
      this.totalMinutes = 0;
    }
  }

  public getHours(): number {
    return Math.floor(this.totalMinutes / MINUTES_IN_HOUR);
  }

  public getMinutes(): number {
    const remainingMinutes = this.totalMinutes % MINUTES_IN_HOUR;
    return Math.floor(remainingMinutes);
  }

  public toString() {
    const hours = this.getHours();
    const minutes = this.getMinutes();

    const hoursPortion = hours.toString().padStart(2, '0');
    const minutesPortion = minutes.toString().padStart(2, '0');

    return `${hoursPortion}:${minutesPortion}`;
  }

  public addHours(hours: number) {
    this.totalMinutes += hours * MINUTES_IN_HOUR;
  }

  public addMinutes(minutes: number) {
    this.totalMinutes += minutes;
  }
}
