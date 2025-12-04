// Copyright 2022-2025, University of Colorado Boulder

/**
 * DiscontinuitiesControl is the control in the Preferences dialog for selecting how discontinuities in curves
 * will be displayed. It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../../axon/js/Property.js';
import PreferencesControl from '../../../../../joist/js/preferences/PreferencesControl.js';
import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import Circle from '../../../../../scenery/js/nodes/Circle.js';
import Line, { LineOptions } from '../../../../../scenery/js/nodes/Line.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import { ConnectDiscontinuities } from '../../CalculusGrapherQueryParameters.js';

export default class DiscontinuitiesControl extends PreferencesControl {

  private readonly disposeDiscontinuitiesControl: () => void;

  public constructor( connectDiscontinuitiesProperty: Property<ConnectDiscontinuities>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherFluent.discontinuitiesStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      maxWidth: CalculusGrapherConstants.PREFERENCES_LABEL_MAX_WIDTH,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const radioButtonGroup = new DiscontinuitiesRadioButtonGroup( connectDiscontinuitiesProperty,
      tandem.createTandem( 'radioButtonGroup' ) );

    super( {
      labelNode: labelText,
      controlNode: radioButtonGroup,
      labelSpacing: 20,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    this.disposeDiscontinuitiesControl = () => {
      labelText.dispose();
      radioButtonGroup.dispose();
    };
  }

  public override dispose(): void {
    this.disposeDiscontinuitiesControl();
    super.dispose();
  }
}

/**
 * The radio button group for this control.
 */
class DiscontinuitiesRadioButtonGroup extends RectangularRadioButtonGroup<ConnectDiscontinuities> {

  public constructor( connectDiscontinuitiesProperty: Property<ConnectDiscontinuities>, tandem: Tandem ) {

    const items: RectangularRadioButtonGroupItem<ConnectDiscontinuities>[] = [
      {
        value: 'noLine',
        createNode: () => new DiscontinuitiesRadioButtonLabel( 'noLine' ),
        tandemName: 'noLineRadioButton',
        options: {
          accessibleName: CalculusGrapherFluent.a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleNameStringProperty,
          accessibleHelpText: CalculusGrapherFluent.a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleHelpTextStringProperty
        }
      },
      {
        value: 'dashedLine',
        createNode: () => new DiscontinuitiesRadioButtonLabel( 'dashedLine' ),
        tandemName: 'dashedLineRadioButton',
        options: {
          accessibleName: CalculusGrapherFluent.a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleNameStringProperty,
          accessibleHelpText: CalculusGrapherFluent.a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleHelpTextStringProperty
        }
      }
    ];

    super( connectDiscontinuitiesProperty, items, {
      orientation: 'horizontal',
      radioButtonOptions: {
        baseColor: 'white',
        xMargin: 0,
        yMargin: 7,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2
        },
        phetioVisiblePropertyInstrumented: false
      },
      accessibleHelpText: CalculusGrapherFluent.a11y.discontinuitiesRadioButtonGroup.accessibleHelpTextStringProperty,
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );
  }
}

/**
 * Labels for the radio buttons.
 */
class DiscontinuitiesRadioButtonLabel extends Node {

  private readonly disposeDiscontinuitiesRadioButtonLabel: () => void;

  public constructor( value: ConnectDiscontinuities ) {

    const lineWidth = 2;
    const verticalGap = 25;

    // 2 horizontal lines
    const lineLength = 20;
    const lineOptions = {
      lineWidth: lineWidth,
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty // Nodes that use circleOptions must be disposed!
    };
    const leftLine = new Line( 0, 0, lineLength, 0, lineOptions );
    const rightLine = new Line( 0, 0, lineLength, 0, lineOptions );

    // 2 open circles
    const circleOptions = {
      radius: 3,
      lineWidth: 2,
      stroke: CalculusGrapherColors.derivativeCurveStrokeProperty // Nodes that use circleOptions must be disposed!
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
    let dashedLine: Line;
    if ( value === 'dashedLine' ) {
      dashedLine = new Line( leftCircle.centerX, leftCircle.top, rightCircle.centerX, rightCircle.bottom,
        combineOptions<LineOptions>( {
          lineDash: [ 2, 2 ]
        }, lineOptions ) );
      children.push( dashedLine );
    }

    super( {
      children: children
    } );

    this.disposeDiscontinuitiesRadioButtonLabel = () => children.forEach( child => child.dispose() );
  }

  public override dispose(): void {
    this.disposeDiscontinuitiesRadioButtonLabel();
    super.dispose();
  }
}

calculusGrapher.register( 'DiscontinuitiesControl', DiscontinuitiesControl );