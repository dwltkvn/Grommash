import React from "react";
import PropTypes from "prop-types";

import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Responsive from 'grommet/utils/Responsive';

// http://grommet.io/docs/icon/
import FavIcon from 'grommet/components/icons/base/Favorite';
import HelpIcon from 'grommet/components/icons/base/Help';
import MailIcon from 'grommet/components/icons/base/Mail';

// http://grommet.io/docs/color/

class MenuHeader extends React.Component {
  state = {};

  constructor() {
    super();
    this._onResponsive = this._onResponsive.bind(this);
  }

  componentDidMount() {
    this._responsive = Responsive.start(this._onResponsive);
  }

  componentWillUnmount() {
    this._responsive.stop();
  }

  _onResponsive(small) {
    this.setState({ small });
    console.log(this.state.small);
  }

  render() {
    return (
      <Header size='small' colorIndex='light-2'>

        <Box responsive full='horizontal' justify='center' textAlign='center'>
          { this.state.small ?
            <Anchor id="anchorFav" icon={<FavIcon />} label='' href='#' /> :
            <Anchor icon={<FavIcon />} label='Réserver' href='#' />
          }
        </Box>

        <Box responsive full='horizontal' justify='center' textAlign='center'>
          {this.state.small ?
            <Anchor icon={<MailIcon />} label='' href='#' /> :
            <Anchor icon={<MailIcon />} label='Contacter' href='#' />
          }
        </Box>

        <Box responsive full='horizontal' justify='center' textAlign='center'>
          
          {this.state.small ?
            <Anchor icon={<HelpIcon />} label='' href='#' /> :
            <Anchor icon={<HelpIcon />} label='Information' href='#' />
          }
        </Box>

      </Header>
    );
  }
}

MenuHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (MenuHeader);