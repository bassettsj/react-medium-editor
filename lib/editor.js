// @flow
import 'babel-polyfill';
import blacklist from 'blacklist';
import React, {
  PropTypes,
  Component
} from 'react';
import ReactDOM from 'react-dom';
const isDOM= typeof document !== 'undefined';
import type $MediumEditor from 'medium-editor';

let MediumEditor: $MediumEditor;
if (isDOM) {
  MediumEditor = require('medium-editor');
} else {
  MediumEditor = class {

  }
}

export type Props = {
  text?: string,
  tag?: string,
  onChange?: (value: string) => void,
  options?: Object
};

const getText = (props: Props): string => {
  let result: string = '';
  if (props.hasOwnProperty('text') && typeof props.text === 'string') {
    result = props.text;
  }
  return result;
}

export default class ReactMediumEditor extends Component {
  constructor(...args: Array<any>) {
    super(...args);
    this.state = {
      text: getText(this.props)
    };
  }
  state: {
    text: string
  };

  defaultProps: {
    tag: string
  };
  props: Props;

  medium: $MediumEditor;

  _updated: boolean;

  componentDidMount() {
    if (!isDOM) return;
    var dom = ReactDOM.findDOMNode(this);

    this.medium = new MediumEditor(dom, Object.assign({}, this.props.options));
    this.medium.subscribe('editableInput', (e) => {
      this._updated = true;
      this.change(dom.innerHTML);
    });
  }

  componentDidUpdate() {
    this.medium.restoreSelection();
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  componentWillReceiveProps(nextProps: Props) {
    if(nextProps.text !== this.state.text && !this._updated) {
      this.setState({text: nextProps.text});
    }

    if(this._updated) this._updated = false;
  }

  render(): React$Element {
    const tag = this.props.tag;
    const props = blacklist(this.props, 'tag', 'contentEditable', 'dangerouslySetInnerHTML');

    Object.assign(props, {
      contentEditable: true,
      dangerouslySetInnerHTML: {__html: this.state.text}
    });

    if (this.medium) {
      this.medium.saveSelection();
    }

    return React.createElement(React.DOM[tag], props);
  }

  change(text: ?string) {
    if (this.props.onChange) this.props.onChange(typeof text === 'string' ? text : '', this.medium);
  }

  static defaultProps = {
    tag: 'div'
  };
  static propTypes = {
    tag: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.object
  };
}
