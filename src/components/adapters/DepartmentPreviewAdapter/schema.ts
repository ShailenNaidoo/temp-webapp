/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/camelcase */

import faker, { commerce, helpers, finance, random, lorem } from 'faker';

import { TsphereId } from '../../../data/constants/spheres/schema';
import { TgoverningBodyId } from '../../../data/constants/governingBodies/schema';
import { TvalidFinancialYear } from '../../../data/constants/financialYears/schema';
import uniqueProjectSeed from '../../../helpers/utilities/uniqueProjectSeed';
import financialYears from '../../../data/constants/financialYears';
import {
  Tdepartment,
  TdepartmentProgramme,
  TdepartmentId,
} from '../../../data/schemas/departments';

/**
 * The shape of the response received from the API request.
 */
export interface Tresponse {
  data: {
    items: Tdepartment[];
  };
}

/**
 * While true, then rendering of view is delayed until all critical data has been retrieved. If
 * false, the designated view will render. Usually starts as true and then changes to false once all
 * data has been loaded.
 */
export type loading = boolean;

/**
 * Internal state of `<DataLoader />`.
 */
export interface Tstate {
  loading: loading;
  data: Tdepartment[] | null;
}

/**
 * Properties passed inside of `<Routing />`
 */
export interface TrouterProps {
  year: TvalidFinancialYear;
  sphere: TsphereId;
  government: TgoverningBodyId;
  department: TdepartmentId;
}

/**
 * Props that `<DataLoader />` accepts.
 */
export type Tprops = TrouterProps;

/** Mock data */
faker.seed(uniqueProjectSeed);
const title = commerce.department();

const mock: Tresponse = {
  data: {
    items: [1, 2, 3, 4, 5, 6].map(
      (key: number): Tdepartment => ({
        title,
        description: lorem.paragraphs(4),
        year: financialYears.years[key],
        slug: helpers.slugify(title),
        total: parseFloat(random.number() * 100 + finance.amount()),
        percentage_of_budget: parseFloat(random.number() * 100 + finance.amount()),
        programmes: [1, 2, 3, 4, 5, 6].map(
          (): TdepartmentProgramme => {
            const programmeTitle = commerce.department();

            return {
              title: programmeTitle,
              slug: helpers.slugify(programmeTitle),
              amount: parseFloat(random.number() * 100 + finance.amount()),
              percentage: parseFloat(random.number() * 100 + finance.amount()),
            };
          },
        ),
      }),
    ),
  },
};

export default mock;
