import Match from '../database/models/Match.model';
import { IHomeOrAway, IProperties } from './properties.types';

export interface ISumHelper {
  homeOrAway: IHomeOrAway;
  otherSide: IHomeOrAway;
  properties: IProperties[];
  calculate(teamMatches: Match[], propertie: IProperties): string | number;
}
