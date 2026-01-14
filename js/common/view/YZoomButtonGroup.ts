// Copyright 2026, University of Colorado Boulder

/**
 * YZoomButtonGroup is the zoom-button group for the y-axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import TRangedProperty from '../../../../axon/js/TRangedProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PlusMinusZoomButtonGroup, { PlusMinusZoomButtonGroupOptions } from '../../../../scenery-phet/js/PlusMinusZoomButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';

type SelfOptions = EmptySelfOptions;

export type YZoomButtonGroupOptions = SelfOptions &
  PickOptional<PlusMinusZoomButtonGroupOptions, 'zoomInButtonOptions' | 'zoomOutButtonOptions'> &
  PickRequired<PlusMinusZoomButtonGroupOptions, 'tandem'>;

export default class YZoomButtonGroup extends PlusMinusZoomButtonGroup {

  public constructor( yZoomLevelProperty: TRangedProperty,
                      yRangeMaxValues: number[], // indexed by yZoomLevelProperty.value
                      providedOptions: YZoomButtonGroupOptions ) {

    const yMaxProperty = new DerivedProperty( [ yZoomLevelProperty ], yZoomLevel => yRangeMaxValues[ yZoomLevel ] );
    const yMinProperty = new DerivedProperty( [ yMaxProperty ], yMax => -yMax );

    // Context response for the zoom-in button.
    const accessibleContextResponseZoomInProperty = new DerivedStringProperty( [
        yZoomLevelProperty,
        // Context response when we are fully zoomed in.
        CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomInButton.accessibleContextResponseMax.createProperty( {
          min: yMinProperty,
          max: yMaxProperty
        } ),
        CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomInButton.accessibleContextResponse.createProperty( {
          min: yMinProperty,
          max: yMaxProperty
        } )
      ],
      ( zoomLevel, responseMax, response ) => ( zoomLevel === yZoomLevelProperty.range.max ) ? responseMax : response );

    // Context response for the zoom-out button.
    const accessibleContextResponseZoomOutProperty = new DerivedStringProperty( [
        yZoomLevelProperty,
        // Context response when we are fully zoomed out.
        CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomOutButton.accessibleContextResponseMax.createProperty( {
          min: yMinProperty,
          max: yMaxProperty
        } ),
        CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomOutButton.accessibleContextResponse.createProperty( {
          min: yMinProperty,
          max: yMaxProperty
        } )
      ],
      ( zoomLevel, responseMax, response ) => ( zoomLevel === yZoomLevelProperty.range.min ) ? responseMax : response );

    const options = optionize<YZoomButtonGroupOptions, SelfOptions, PlusMinusZoomButtonGroupOptions>()( {
      isDisposable: false,
      orientation: 'vertical',
      touchAreaXDilation: 6,
      touchAreaYDilation: 3,
      buttonOptions: {
        stroke: 'black'
      },
      zoomInButtonOptions: {
        accessibleHelpText: CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomInButton.accessibleHelpTextStringProperty,
        accessibleContextResponse: accessibleContextResponseZoomInProperty
      },
      zoomOutButtonOptions: {
        accessibleHelpText: CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomOutButton.accessibleHelpTextStringProperty,
        accessibleContextResponse: accessibleContextResponseZoomOutProperty
      },
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    super( yZoomLevelProperty, options );
  }
}

calculusGrapher.register( 'YZoomButtonGroup', YZoomButtonGroup );