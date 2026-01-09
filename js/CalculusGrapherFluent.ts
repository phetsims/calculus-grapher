// Copyright 2025-2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from calculus-grapher-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import type {FluentVariable} from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import calculusGrapher from './calculusGrapher.js';
import CalculusGrapherStrings from './CalculusGrapherStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( CalculusGrapherStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'calculus_grapher_title', 'calculus-grapher.titleStringProperty' );
addToMapIfDefined( 'screen_derivative', 'screen.derivativeStringProperty' );
addToMapIfDefined( 'screen_integral', 'screen.integralStringProperty' );
addToMapIfDefined( 'screen_advanced', 'screen.advancedStringProperty' );
addToMapIfDefined( 'screen_lab', 'screen.labStringProperty' );
addToMapIfDefined( 'smooth', 'smoothStringProperty' );
addToMapIfDefined( 'symbol_d', 'symbol.dStringProperty' );
addToMapIfDefined( 'symbol_f', 'symbol.fStringProperty' );
addToMapIfDefined( 'symbol_x', 'symbol.xStringProperty' );
addToMapIfDefined( 'symbol_t', 'symbol.tStringProperty' );
addToMapIfDefined( 'discontinuities', 'discontinuitiesStringProperty' );
addToMapIfDefined( 'values', 'valuesStringProperty' );
addToMapIfDefined( 'notation', 'notationStringProperty' );
addToMapIfDefined( 'lagrange', 'lagrangeStringProperty' );
addToMapIfDefined( 'leibniz', 'leibnizStringProperty' );
addToMapIfDefined( 'variable', 'variableStringProperty' );
addToMapIfDefined( 'checkbox_areaUnderCurve', 'checkbox.areaUnderCurveStringProperty' );
addToMapIfDefined( 'checkbox_tangent', 'checkbox.tangentStringProperty' );
addToMapIfDefined( 'barometer_netSignedArea', 'barometer.netSignedAreaStringProperty' );
addToMapIfDefined( 'barometer_slopeOfTangent', 'barometer.slopeOfTangentStringProperty' );
addToMapIfDefined( 'predict', 'predictStringProperty' );
addToMapIfDefined( 'show', 'showStringProperty' );
addToMapIfDefined( 'predictPreference', 'predictPreferenceStringProperty' );
addToMapIfDefined( 'valuesPreferenceDescription', 'valuesPreferenceDescriptionStringProperty' );
addToMapIfDefined( 'referenceLine', 'referenceLineStringProperty' );
addToMapIfDefined( 'curveManipulator_keyboardHelpHeading', 'curveManipulator.keyboardHelpHeadingStringProperty' );
addToMapIfDefined( 'curveManipulator_keyboardHelpLabel', 'curveManipulator.keyboardHelpLabelStringProperty' );
addToMapIfDefined( 'curveManipulator_keyboardCue', 'curveManipulator.keyboardCueStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenButtonsHelpText', 'a11y.derivativeScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_playArea', 'a11y.derivativeScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_controlArea', 'a11y.derivativeScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_currentDetails', 'a11y.derivativeScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_interactionHint', 'a11y.derivativeScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenButtonsHelpText', 'a11y.integralScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_playArea', 'a11y.integralScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_controlArea', 'a11y.integralScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_currentDetails', 'a11y.integralScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_interactionHint', 'a11y.integralScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenButtonsHelpText', 'a11y.advancedScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_playArea', 'a11y.advancedScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_controlArea', 'a11y.advancedScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_currentDetails', 'a11y.advancedScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_interactionHint', 'a11y.advancedScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenButtonsHelpText', 'a11y.labScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_playArea', 'a11y.labScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_controlArea', 'a11y.labScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_currentDetails', 'a11y.labScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_interactionHint', 'a11y.labScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleName', 'a11y.gridCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleHelpText', 'a11y.gridCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseChecked', 'a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseUnchecked', 'a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleName', 'a11y.smoothButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleHelpText', 'a11y.smoothButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleContextResponsePrimaryCurve', 'a11y.smoothButton.accessibleContextResponsePrimaryCurveStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleContextResponsePredictCurve', 'a11y.smoothButton.accessibleContextResponsePredictCurveStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleName', 'a11y.eraserButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleHelpText', 'a11y.eraserButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleContextResponsePrimaryCurve', 'a11y.eraserButton.accessibleContextResponsePrimaryCurveStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleContextResponsePredictCurve', 'a11y.eraserButton.accessibleContextResponsePredictCurveStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleName', 'a11y.undoButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleHelpText', 'a11y.undoButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleContextResponsePrimaryCurve', 'a11y.undoButton.accessibleContextResponsePrimaryCurveStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleContextResponsePredictCurve', 'a11y.undoButton.accessibleContextResponsePredictCurveStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleName', 'a11y.eyeToggleButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleHelpText', 'a11y.eyeToggleButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleContextResponseOff', 'a11y.eyeToggleButton.accessibleContextResponseOffStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleContextResponseOn', 'a11y.eyeToggleButton.accessibleContextResponseOnStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleName', 'a11y.yZoomButtonGroup.zoomInButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleHelpText', 'a11y.yZoomButtonGroup.zoomInButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleHelpText', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleHelpText', 'a11y.tangentCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleContextResponseChecked', 'a11y.tangentCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleContextResponseUnchecked', 'a11y.tangentCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleName', 'a11y.referenceLineCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleHelpText', 'a11y.referenceLineCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleContextResponseChecked', 'a11y.referenceLineCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleContextResponseUnchecked', 'a11y.referenceLineCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleName', 'a11y.areaUnderCurveCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleHelpText', 'a11y.areaUnderCurveCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleContextResponseChecked', 'a11y.areaUnderCurveCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleContextResponseUnchecked', 'a11y.areaUnderCurveCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_variableRadioButtonGroup_accessibleHelpText', 'a11y.variableRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_variableRadioButtonGroup_xRadioButton_accessibleHelpText', 'a11y.variableRadioButtonGroup.xRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_variableRadioButtonGroup_tRadioButton_accessibleHelpText', 'a11y.variableRadioButtonGroup.tRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_accessibleHelpText', 'a11y.notationRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleName', 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleHelpText', 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleName', 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleHelpText', 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleName', 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleName', 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictToggleSwitch_accessibleHelpText', 'a11y.predictToggleSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationWidthSlider_accessibleName', 'a11y.curveManipulationWidthSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationWidthSlider_accessibleHelpText', 'a11y.curveManipulationWidthSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_accessibleName', 'a11y.graphSetRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralRadioButton_advanced_accessibleName', 'a11y.graphSetRadioButtonGroup.integralRadioButton.advanced.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralRadioButton_advanced_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.integralRadioButton.advanced.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralRadioButton_lab_accessibleName', 'a11y.graphSetRadioButtonGroup.integralRadioButton.lab.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralRadioButton_lab_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.integralRadioButton.lab.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_derivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_derivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_secondDerivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_secondDerivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_slopeOfTangentAccordionBox_accessibleHelpTextCollapsed', 'a11y.slopeOfTangentAccordionBox.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_slopeOfTangentAccordionBox_accessibleParagraph', 'a11y.slopeOfTangentAccordionBox.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_netSignedAreaAccordionBox_accessibleHelpTextCollapsed', 'a11y.netSignedAreaAccordionBox.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_netSignedAreaAccordionBox_accessibleParagraph', 'a11y.netSignedAreaAccordionBox.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_originalGraph_accessibleHeading', 'a11y.originalGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_originalGraph_accessibleParagraph', 'a11y.originalGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_integralGraph_accessibleHeading', 'a11y.integralGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_integralGraph_accessibleParagraph', 'a11y.integralGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_derivativeGraph_accessibleHeading', 'a11y.derivativeGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_derivativeGraph_accessibleParagraph', 'a11y.derivativeGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_secondDerivativeGraph_accessibleHeading', 'a11y.secondDerivativeGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_secondDerivativeGraph_accessibleParagraph', 'a11y.secondDerivativeGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_accessibleName', 'a11y.predictRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_accessibleHelpText', 'a11y.predictRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleName', 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleHelpText', 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleName', 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleHelpText', 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleName', 'a11y.showOriginalCurveCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleHelpText', 'a11y.showOriginalCurveCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleContextResponseChecked', 'a11y.showOriginalCurveCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleContextResponseUnchecked', 'a11y.showOriginalCurveCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleName', 'a11y.tangentTool.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleHelpText', 'a11y.tangentTool.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse', 'a11y.tangentTool.accessibleObjectResponseStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleName', 'a11y.referenceLineTool.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleHelpText', 'a11y.referenceLineTool.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponseFirstDerivative', 'a11y.referenceLineTool.accessibleObjectResponseFirstDerivativeStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponseIntegral', 'a11y.referenceLineTool.accessibleObjectResponseIntegralStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponseIntegralFirstDerivative', 'a11y.referenceLineTool.accessibleObjectResponseIntegralFirstDerivativeStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponseFirstDerivativeSecondDerivative', 'a11y.referenceLineTool.accessibleObjectResponseFirstDerivativeSecondDerivativeStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleName', 'a11y.areaUnderCurveTool.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleHelpText', 'a11y.areaUnderCurveTool.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse', 'a11y.areaUnderCurveTool.accessibleObjectResponseStringProperty' );
addToMapIfDefined( 'a11y_curveManipulatorNode_accessibleName', 'a11y.curveManipulatorNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulatorNode_accessibleHelpText', 'a11y.curveManipulatorNode.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulatorNode_accessibleObjectResponse', 'a11y.curveManipulatorNode.accessibleObjectResponseStringProperty' );
addToMapIfDefined( 'a11y_pushButtonGroup_accessibleHelpText', 'a11y.pushButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphAreas_accessibleListLeadingParagraph', 'a11y.graphAreas.accessibleListLeadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_headings_graphAreas', 'a11y.headings.graphAreasStringProperty' );
addToMapIfDefined( 'a11y_headings_curveManipulationSettingsAndControls', 'a11y.headings.curveManipulationSettingsAndControlsStringProperty' );
addToMapIfDefined( 'a11y_headings_toolControls', 'a11y.headings.toolControlsStringProperty' );
addToMapIfDefined( 'a11y_headings_explorationTools', 'a11y.headings.explorationToolsStringProperty' );
addToMapIfDefined( 'a11y_headings_actionsButtonGroup', 'a11y.headings.actionsButtonGroupStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${FluentLibrary.formatMultilineForFtl( stringProperty.value )}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const CalculusGrapherFluent = {
  "calculus-grapher": {
    titleStringProperty: _.get( CalculusGrapherStrings, 'calculus-grapher.titleStringProperty' )
  },
  screen: {
    derivativeStringProperty: _.get( CalculusGrapherStrings, 'screen.derivativeStringProperty' ),
    integralStringProperty: _.get( CalculusGrapherStrings, 'screen.integralStringProperty' ),
    advancedStringProperty: _.get( CalculusGrapherStrings, 'screen.advancedStringProperty' ),
    labStringProperty: _.get( CalculusGrapherStrings, 'screen.labStringProperty' )
  },
  smoothStringProperty: _.get( CalculusGrapherStrings, 'smoothStringProperty' ),
  symbol: {
    dStringProperty: _.get( CalculusGrapherStrings, 'symbol.dStringProperty' ),
    fStringProperty: _.get( CalculusGrapherStrings, 'symbol.fStringProperty' ),
    xStringProperty: _.get( CalculusGrapherStrings, 'symbol.xStringProperty' ),
    tStringProperty: _.get( CalculusGrapherStrings, 'symbol.tStringProperty' )
  },
  discontinuitiesStringProperty: _.get( CalculusGrapherStrings, 'discontinuitiesStringProperty' ),
  valuesStringProperty: _.get( CalculusGrapherStrings, 'valuesStringProperty' ),
  notationStringProperty: _.get( CalculusGrapherStrings, 'notationStringProperty' ),
  lagrangeStringProperty: _.get( CalculusGrapherStrings, 'lagrangeStringProperty' ),
  leibnizStringProperty: _.get( CalculusGrapherStrings, 'leibnizStringProperty' ),
  variableStringProperty: _.get( CalculusGrapherStrings, 'variableStringProperty' ),
  checkbox: {
    areaUnderCurveStringProperty: _.get( CalculusGrapherStrings, 'checkbox.areaUnderCurveStringProperty' ),
    tangentStringProperty: _.get( CalculusGrapherStrings, 'checkbox.tangentStringProperty' )
  },
  barometer: {
    netSignedAreaStringProperty: _.get( CalculusGrapherStrings, 'barometer.netSignedAreaStringProperty' ),
    slopeOfTangentStringProperty: _.get( CalculusGrapherStrings, 'barometer.slopeOfTangentStringProperty' )
  },
  predictStringProperty: _.get( CalculusGrapherStrings, 'predictStringProperty' ),
  showStringProperty: _.get( CalculusGrapherStrings, 'showStringProperty' ),
  predictPreferenceStringProperty: _.get( CalculusGrapherStrings, 'predictPreferenceStringProperty' ),
  valuesPreferenceDescriptionStringProperty: _.get( CalculusGrapherStrings, 'valuesPreferenceDescriptionStringProperty' ),
  predictPreferenceDescriptionStringProperty: _.get( CalculusGrapherStrings, 'predictPreferenceDescriptionStringProperty' ),
  referenceLineStringProperty: _.get( CalculusGrapherStrings, 'referenceLineStringProperty' ),
  curveManipulator: {
    keyboardHelpHeadingStringProperty: _.get( CalculusGrapherStrings, 'curveManipulator.keyboardHelpHeadingStringProperty' ),
    keyboardHelpLabelStringProperty: _.get( CalculusGrapherStrings, 'curveManipulator.keyboardHelpLabelStringProperty' ),
    keyboardCueStringProperty: _.get( CalculusGrapherStrings, 'curveManipulator.keyboardCueStringProperty' )
  },
  a11y: {
    derivativeScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenButtonsHelpTextStringProperty' ) ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    integralScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenButtonsHelpTextStringProperty' ) ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    advancedScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenButtonsHelpTextStringProperty' ) ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    labScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenButtonsHelpTextStringProperty' ) ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    gridCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    smoothButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponsePrimaryCurve: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleContextResponsePrimaryCurve', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleContextResponsePrimaryCurveStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponsePredictCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleContextResponsePredictCurve', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleContextResponsePredictCurveStringProperty' ) )
    },
    eraserButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponsePrimaryCurve: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleContextResponsePrimaryCurve', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleContextResponsePrimaryCurveStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponsePredictCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleContextResponsePredictCurve', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleContextResponsePredictCurveStringProperty' ) )
    },
    undoButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponsePrimaryCurve: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleContextResponsePrimaryCurve', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleContextResponsePrimaryCurveStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponsePredictCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleContextResponsePredictCurve', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleContextResponsePredictCurveStringProperty' ) )
    },
    eyeToggleButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseOffStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleContextResponseOff', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleContextResponseOffStringProperty' ) ),
      accessibleContextResponseOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleContextResponseOn', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleContextResponseOnStringProperty' ) )
    },
    yZoomButtonGroup: {
      zoomInButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleHelpTextStringProperty' ) )
      },
      zoomOutButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleHelpTextStringProperty' ) )
      }
    },
    tangentCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    referenceLineCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    areaUnderCurveCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    variableRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_variableRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.variableRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      xRadioButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_variableRadioButtonGroup_xRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.variableRadioButtonGroup.xRadioButton.accessibleHelpTextStringProperty' ) )
      },
      tRadioButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_variableRadioButtonGroup_tRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.variableRadioButtonGroup.tRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    notationRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      lagrangeRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      leibnizRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
      }
    },
    discontinuitiesRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      noLineRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleHelpTextStringProperty' ) )
      },
      dashedLineRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    predictToggleSwitch: {
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictToggleSwitch_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictToggleSwitch.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    curveManipulationWidthSlider: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationWidthSlider_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationWidthSlider.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationWidthSlider_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationWidthSlider.accessibleHelpTextStringProperty' ) )
    },
    curveManipulationModeRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      hillRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty' ) )
      },
      triangleRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty' ) )
      },
      pedestalRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty' ) )
      },
      parabolaRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty' ) )
      },
      sinusoidRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty' ) )
      },
      freeformRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty' ) )
      },
      tiltRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty' ) )
      },
      shiftRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    graphSetRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      integralRadioButton: {
        advanced: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralRadioButton_advanced_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralRadioButton.advanced.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralRadioButton_advanced_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralRadioButton.advanced.accessibleHelpTextStringProperty' ) )
        },
        lab: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralRadioButton_lab_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralRadioButton.lab.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralRadioButton_lab_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralRadioButton.lab.accessibleHelpTextStringProperty' ) )
        }
      },
      derivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_derivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_derivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.derivativeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      secondDerivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_secondDerivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_secondDerivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.secondDerivativeRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    slopeOfTangentAccordionBox: {
      accessibleHelpTextCollapsed: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_slopeOfTangentAccordionBox_accessibleHelpTextCollapsed', _.get( CalculusGrapherStrings, 'a11y.slopeOfTangentAccordionBox.accessibleHelpTextCollapsedStringProperty' ), [{"name":"variable"}] ),
      accessibleParagraph: new FluentPattern<{ firstDerivativeValue: FluentVariable, variable: FluentVariable, x: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_slopeOfTangentAccordionBox_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.slopeOfTangentAccordionBox.accessibleParagraphStringProperty' ), [{"name":"firstDerivativeValue"},{"name":"variable"},{"name":"x"}] )
    },
    netSignedAreaAccordionBox: {
      accessibleHelpTextCollapsed: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_netSignedAreaAccordionBox_accessibleHelpTextCollapsed', _.get( CalculusGrapherStrings, 'a11y.netSignedAreaAccordionBox.accessibleHelpTextCollapsedStringProperty' ), [{"name":"variable"}] ),
      accessibleParagraph: new FluentPattern<{ integralValue: FluentVariable, variable: FluentVariable, x: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_netSignedAreaAccordionBox_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.netSignedAreaAccordionBox.accessibleParagraphStringProperty' ), [{"name":"integralValue"},{"name":"variable"},{"name":"x"}] )
    },
    originalGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_originalGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.originalGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_originalGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.originalGraph.accessibleParagraphStringProperty' ) )
    },
    integralGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.integralGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.integralGraph.accessibleParagraphStringProperty' ) )
    },
    derivativeGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.derivativeGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.derivativeGraph.accessibleParagraphStringProperty' ) )
    },
    secondDerivativeGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_secondDerivativeGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.secondDerivativeGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_secondDerivativeGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.secondDerivativeGraph.accessibleParagraphStringProperty' ) )
    },
    predictRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      originalCurveRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
      },
      predictCurveRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
      }
    },
    showOriginalCurveCheckbox: {
      accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleNameStringProperty' ), [{"name":"variable"}] ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponseChecked: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleContextResponseCheckedStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponseUnchecked: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleContextResponseUncheckedStringProperty' ), [{"name":"variable"}] )
    },
    tangentTool: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleName', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleObjectResponse: new FluentPattern<{ firstDerivativeValue: FluentVariable, variable: FluentVariable, x: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponseStringProperty' ), [{"name":"firstDerivativeValue"},{"name":"variable"},{"name":"x"}] )
    },
    referenceLineTool: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleName', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleObjectResponseFirstDerivative: new FluentPattern<{ firstDerivativeValue: FluentVariable, variable: FluentVariable, x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponseFirstDerivative', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponseFirstDerivativeStringProperty' ), [{"name":"firstDerivativeValue"},{"name":"variable"},{"name":"x"},{"name":"y"}] ),
      accessibleObjectResponseIntegral: new FluentPattern<{ integralValue: FluentVariable, variable: FluentVariable, x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponseIntegral', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponseIntegralStringProperty' ), [{"name":"integralValue"},{"name":"variable"},{"name":"x"},{"name":"y"}] ),
      accessibleObjectResponseIntegralFirstDerivative: new FluentPattern<{ firstDerivativeValue: FluentVariable, integralValue: FluentVariable, variable: FluentVariable, x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponseIntegralFirstDerivative', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponseIntegralFirstDerivativeStringProperty' ), [{"name":"firstDerivativeValue"},{"name":"integralValue"},{"name":"variable"},{"name":"x"},{"name":"y"}] ),
      accessibleObjectResponseFirstDerivativeSecondDerivative: new FluentPattern<{ firstDerivativeValue: FluentVariable, secondDerivativeValue: FluentVariable, variable: FluentVariable, x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponseFirstDerivativeSecondDerivative', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponseFirstDerivativeSecondDerivativeStringProperty' ), [{"name":"firstDerivativeValue"},{"name":"secondDerivativeValue"},{"name":"variable"},{"name":"x"},{"name":"y"}] )
    },
    areaUnderCurveTool: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleName', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleObjectResponse: new FluentPattern<{ integralValue: FluentVariable, variable: FluentVariable, x: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponseStringProperty' ), [{"name":"integralValue"},{"name":"variable"},{"name":"x"}] )
    },
    curveManipulatorNode: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulatorNode_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulatorNode.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulatorNode_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulatorNode.accessibleHelpTextStringProperty' ) ),
      accessibleObjectResponse: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulatorNode_accessibleObjectResponse', _.get( CalculusGrapherStrings, 'a11y.curveManipulatorNode.accessibleObjectResponseStringProperty' ), [{"name":"x"},{"name":"y"}] )
    },
    pushButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pushButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.pushButtonGroup.accessibleHelpTextStringProperty' ) )
    },
    graphAreas: {
      accessibleListLeadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphAreas_accessibleListLeadingParagraph', _.get( CalculusGrapherStrings, 'a11y.graphAreas.accessibleListLeadingParagraphStringProperty' ) )
    },
    headings: {
      graphAreasStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_graphAreas', _.get( CalculusGrapherStrings, 'a11y.headings.graphAreasStringProperty' ) ),
      curveManipulationSettingsAndControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_curveManipulationSettingsAndControls', _.get( CalculusGrapherStrings, 'a11y.headings.curveManipulationSettingsAndControlsStringProperty' ) ),
      toolControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_toolControls', _.get( CalculusGrapherStrings, 'a11y.headings.toolControlsStringProperty' ) ),
      explorationToolsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_explorationTools', _.get( CalculusGrapherStrings, 'a11y.headings.explorationToolsStringProperty' ) ),
      actionsButtonGroupStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_actionsButtonGroup', _.get( CalculusGrapherStrings, 'a11y.headings.actionsButtonGroupStringProperty' ) )
    }
  }
};

export default CalculusGrapherFluent;

calculusGrapher.register('CalculusGrapherFluent', CalculusGrapherFluent);
