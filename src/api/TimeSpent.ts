const MINUTES_IN_HOUR = 60;

export default class TimeSpent {
  private totalMinutes: number;

  // Formatted Time String looks like: 25:00.
  private static parseMinutesFromFormattedTimeString(
    formattedTimeString: string
  ): number {
    const timeArray = formattedTimeString.split(':');

    if (
      timeArray.length !== 2 ||
      timeArray[0].length !== 2 ||
      timeArray[1].length !== 2
    )
      throw new Error(
        `TimeSpent: Wrong format used for ${formattedTimeString}`
      );

    const hoursPortion = +timeArray[0];
    const minutesPortion = +timeArray[1];

    return hoursPortion * 60 + minutesPortion;
  }

  constructor(minutes?: number) {
    if (typeof minutes !== 'undefined') {
      this.totalMinutes = minutes;
    } else {
      this.totalMinutes = 0;
    }
  }

  public static buildFromFormattedTimeString(
    formattedTimeString: string
  ): TimeSpent {
    const newTimeSpent = new TimeSpent();

    if (formattedTimeString === '') return newTimeSpent;

    newTimeSpent.totalMinutes =
      TimeSpent.parseMinutesFromFormattedTimeString(formattedTimeString);

    return newTimeSpent;
  }

  public static validateTimeString(unformattedTimeString: string): boolean {
    try {
      TimeSpent.parseMinutesFromFormattedTimeString(unformattedTimeString);
      return true;
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.includes('TimeSpent: Wrong format used for')
      ) {
        return false;
      } else {
        throw err;
      }
    }
  }

  public getHours(): number {
    return Math.floor(this.totalMinutes / MINUTES_IN_HOUR);
  }

  public getMinutes(): number {
    const remainingMinutes = this.totalMinutes % MINUTES_IN_HOUR;
    return Math.floor(remainingMinutes);
  }

  public getTotalMinutes(): number {
    return this.totalMinutes;
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
