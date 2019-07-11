

export class createHouseDto {
  readonly name: string;
  readonly description: string;
  readonly minDuration: number;
  readonly srcImage: string;
  readonly adress: string;
  readonly dailyPrice: number;
  readonly weekendPrice: number;
  readonly discount: number;
  readonly blockedStart: Date;
  readonly blockedFinish: Date;
}