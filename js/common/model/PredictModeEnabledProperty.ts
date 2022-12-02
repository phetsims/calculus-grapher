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
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Color } from '../../../../scenery/js/imports.js';

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

  public get notProperty(): TReadOnlyProperty<boolean> {
    return new DerivedProperty( [ this ], enabled => !enabled );
  }

  public get colorStrokeProperty(): TReadOnlyProperty<Color> {
    return new DerivedProperty( [ this,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty ],
      ( enabled, predictStroke, originalStroke ) =>
        enabled ? predictStroke : originalStroke );
  }

  // TODO: overkill? or nice to have anyway
  public override reset(): void {
    super.reset();
  }
}
calculusGrapher.register( 'PredictModeEnabledProperty', PredictModeEnabledProperty );
