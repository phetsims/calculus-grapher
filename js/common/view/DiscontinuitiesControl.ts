// Copyright 2022, University of Colorado Boulder

/**
 * DiscontinuitiesControl is the control in the Preferences dialog for selecting how discontinuities in curves
 * will be displayed. It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Circle, HBox, HBoxOptions, Line, LineOptions, Node, Text, TextOptions } from '../../../../scenery/js/imports.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';

type SelfOptions = {
  textOptions?: StrictOmit<TextOptions, 'tandem'>;
};

type DiscontinuitiesControlOptions = SelfOptions & PickRequired<HBoxOptions, 'tandem'>;

export default class DiscontinuitiesControl extends HBox {

  public constructor( connectDiscontinuitiesProperty: Property<boolean>, providedOptions: DiscontinuitiesControlOptions ) {

    const options = optionize<DiscontinuitiesControlOptions, StrictOmit<SelfOptions, 'textOptions'>, HBoxOptions>()( {

      // HBoxOptions
      spacing: 15
    }, providedOptions );

    const labelText = new Text( CalculusGrapherStrings.discontinuitiesStringProperty, combineOptions<TextOptions>( {
      tandem: options.tandem.createTandem( 'labelText' )
    }, options.textOptions ) );

    const radioButtonGroup = new DiscontinuitiesRadioButtonGroup( connectDiscontinuitiesProperty, {
      tandem: options.tandem.createTandem( 'radioButtonGroup' )
    } );

    options.children = [ labelText, radioButtonGroup ];

    super( options );
  }
}

/**
 * The radio button group for this control.
 */

type DiscontinuitiesRadioButtonGroupSelfOptions = EmptySelfOptions;

type DiscontinuitiesRadioButtonGroupOptions = SelfOptions & PickRequired<RectangularRadioButtonGroupOptions, 'tandem'>;

class DiscontinuitiesRadioButtonGroup extends RectangularRadioButtonGroup<boolean> {

  public constructor( connectDiscontinuitiesProperty: Property<boolean>, providedOptions: DiscontinuitiesRadioButtonGroupOptions ) {

    const options = optionize<DiscontinuitiesRadioButtonGroupOptions, DiscontinuitiesRadioButtonGroupSelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      orientation: 'horizontal',
      radioButtonOptions: {
        baseColor: 'white',
        xMargin: 0,
        yMargin: 7,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2
        }
      }
    }, providedOptions );

    const values = [ true, false ];
    const items: RectangularRadioButtonGroupItem<boolean>[] = values.map( value => {
      return {
        value: value,
        createNode: tandem => createIcon( value ),
        tandemName: `${value}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      };
    } );

    super( connectDiscontinuitiesProperty, items, options );
  }
}

/**
 * Creates the icon for a radio button.
 */
function createIcon( connectDiscontinuities: boolean ): Node {

  const lineWidth = 2;
  const verticalGap = 25;

  // 2 horizontal lines
  const lineLength = 20;
  const lineOptions = {
    lineWidth: lineWidth,
    stroke: CalculusGrapherColors.derivativeCurveStrokeProperty
  };
  const leftLine = new Line( 0, 0, lineLength, 0, lineOptions );
  const rightLine = new Line( 0, 0, lineLength, 0, lineOptions );

  // 2 open circles
  const circleOptions = {
    radius: 3,
    lineWidth: 2,
    stroke: CalculusGrapherColors.derivativeCurveStrokeProperty
  };
  const leftCircle = new Circle( circleOptions );
  const rightCircle = new Circle( circleOptions );

  // layout, left to right
  leftCircle.left = leftLine.right;
  leftCircle.centerY = leftLine.centerY;
  rightCircle.x = leftCircle.x;
  rightCircle.centerY = leftCircle.centerY - verticalGap;
  rightLine.left = rightCircle.right;
  rightLine.centerY = rightCircle.centerY;

  const children = [ leftLine, rightLine, leftCircle, rightCircle ];

  // optional vertical dashed line, connecting the 2 circles
  if ( connectDiscontinuities ) {
    children.push( new Line( leftCircle.centerX, leftCircle.top, rightCircle.centerX, rightCircle.bottom,
      combineOptions<LineOptions>( {
        lineDash: [ 2, 2 ]
      }, lineOptions ) )
    );
  }

  return new Node( {
    children: children
  } );
}

calculusGrapher.register( 'DiscontinuitiesControl', DiscontinuitiesControl );