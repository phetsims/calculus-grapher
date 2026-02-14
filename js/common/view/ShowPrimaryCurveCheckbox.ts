// Copyright 2023-2026, University of Colorado Boulder

/**
 * ShowPrimaryCurveCheckbox is the checkbox labeled 'Show f(x)' that appears in the upper-right corner
 * of the primary graph when the 'Predict' radio button is selected.
 *
 * Note that this is actually a subclass of BackgroundNode. It's made to look like a Checkbox in the PhET-iO API,
 * with the BackgroundNode not part of the API.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import GraphType from '../model/GraphType.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';

const POINTER_AREA_DILATION = 6;

export default class ShowPrimaryCurveCheckbox extends BackgroundNode {

  public constructor( showPrimaryCurveProperty: Property<boolean>,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const checkboxContent = new HBox( {
      children: [
        new Text( CalculusGrapherFluent.showStringProperty, {
          font: CalculusGrapherConstants.CONTROL_FONT,
          maxWidth: 100,
          tandem: tandem.createTandem( 'showText' )
        } ),
        new GraphTypeLabelNode( GraphType.PRIMARY )
      ],
      spacing: 5
    } );

    const checkbox = new Checkbox( showPrimaryCurveProperty, checkboxContent,
      combineOptions<CheckboxOptions>( {}, CalculusGrapherConstants.CHECKBOX_OPTIONS, {
        touchAreaXDilation: POINTER_AREA_DILATION,
        touchAreaYDilation: POINTER_AREA_DILATION,
        mouseAreaXDilation: POINTER_AREA_DILATION,
        mouseAreaYDilation: POINTER_AREA_DILATION,
        accessibleName: CalculusGrapherFluent.a11y.showPrimaryCurveCheckbox.accessibleName.createProperty( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
        } ),
        accessibleHelpText: CalculusGrapherFluent.a11y.showPrimaryCurveCheckbox.accessibleHelpText.createProperty( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
        } ),
        accessibleContextResponseChecked: CalculusGrapherFluent.a11y.showPrimaryCurveCheckbox.accessibleContextResponseChecked.createProperty( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
        } ),
        accessibleContextResponseUnchecked: CalculusGrapherFluent.a11y.showPrimaryCurveCheckbox.accessibleContextResponseUnchecked.createProperty( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
        } ),
        tandem: tandem,

        // because 'showPrimaryCurveCheckbox.visibleProperty' is the tandem name for BackgroundNode's visibleProperty
        phetioVisiblePropertyInstrumented: false
      } ) );

    super( checkbox, {
      isDisposable: false,
      xMargin: POINTER_AREA_DILATION,
      yMargin: POINTER_AREA_DILATION,
      rectangleOptions: {
        cornerRadius: 2,
        fill: CalculusGrapherColors.primaryGraphBackgroundFillProperty
      },
      visibleProperty: DerivedProperty.and( [ predictEnabledProperty, CalculusGrapherPreferences.hasShowOriginalCurveCheckboxProperty ], {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } )
      // Do not propagate tandem to BackgroundNode! It is used for the Checkbox above.
    } );
  }
}

calculusGrapher.register( 'ShowPrimaryCurveCheckbox', ShowPrimaryCurveCheckbox );