// Copyright 2022, University of Colorado Boulder

/**
 * PredictModeEnabledProperty is Property that track if the predict mode of original graph is enabled
 *
 * @author Martin Veillette
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { PropertyOptions } from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurve from './TransformedCurve.js';

type SelfOptions = EmptySelfOptions;

export type SelectedCurveOptions = SelfOptions & PropertyOptions<boolean>;

export default class PredictModeEnabledProperty extends BooleanProperty {

  private readonly originalCurve: TransformedCurve;
  private readonly predictCurve: TransformedCurve;

  public constructor( initialEnabled: boolean,
                      originalCurve: TransformedCurve,
                      predictCurve: TransformedCurve,
                      providedOptions: SelectedCurveOptions ) {

    const options = optionize<SelectedCurveOptions, SelfOptions, PropertyOptions<boolean>>()(
      {}, providedOptions );

    super( initialEnabled, options );

    this.originalCurve = originalCurve;
    this.predictCurve = predictCurve;
  }

  public get curve(): TransformedCurve {
    return this.value ? this.predictCurve : this.originalCurve;
  }
}
calculusGrapher.register( 'PredictModeEnabledProperty', PredictModeEnabledProperty );
