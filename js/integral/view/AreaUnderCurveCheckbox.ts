// Copyright 2023, University of Colorado Boulder

/**
 * AreaUnderCurveCheckbox is the checkbox labeled 'Area Under Curve', for making the area-under-curve feature visible.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { HBox, RichText } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CalculusGrapherColors from '../../common/CalculusGrapherColors.js';
import XDragHandleNode from '../../common/view/XDragHandleNode.js';

export default class AreaUnderCurveCheckbox extends Checkbox {

  public constructor( scrubberVisibleProperty: Property<boolean>,
                      predictEnabledProperty: TReadOnlyProperty<boolean>, tandem: Tandem ) {

    const text = new RichText( CalculusGrapherStrings.checkbox.areaUnderCurveStringProperty, {
      font: CalculusGrapherConstants.CONTROL_FONT,
      maxWidth: 100,
      tandem: tandem.createTandem( 'text' )
    } );

    const dragHandleIcon = XDragHandleNode.createIcon( CalculusGrapherColors.integralCurveStrokeProperty );

    const box = new HBox( {
      children: [ text, dragHandleIcon ],
      spacing: 6
    } );

    super( scrubberVisibleProperty, box, {
      boxWidth: CalculusGrapherConstants.CHECKBOX_WIDTH,
      enabledProperty: DerivedProperty.not( predictEnabledProperty ),
      tandem: tandem
    } );
  }
}

calculusGrapher.register( 'AreaUnderCurveCheckbox', AreaUnderCurveCheckbox );