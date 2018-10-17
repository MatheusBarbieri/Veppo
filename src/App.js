import React, { Component } from 'react'
import veppo from './veppo.png'
import './App.css'
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <>
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>
          <img src={veppo} height="60"/>
           Rodoviária de Porto Alegre </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"> </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Serviços
                </DropdownToggle>
                <DropdownMenu left>
                  <DropdownItem> Consultar Horarios </DropdownItem>
                  <DropdownItem> Guiches 24h </DropdownItem>
                  <DropdownItem> Encomendas </DropdownItem>
                  <DropdownItem> Guarda-malas </DropdownItem>
                  <DropdownItem> Informações </DropdownItem>
                  <DropdownItem> DAER </DropdownItem>
                  <DropdownItem> Policia Militar </DropdownItem>
                  <DropdownItem> Banheiros </DropdownItem>
                  <DropdownItem> Telefones </DropdownItem>
                  <DropdownItem> Correio </DropdownItem>
                  <DropdownItem> Linhas Internacionais e Interestaduais </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Vendas Online
                </DropdownToggle>
                <DropdownMenu left>
                  <DropdownItem> Login </DropdownItem>
                  <DropdownItem> Cadastro </DropdownItem>
                  <DropdownItem> Esqueci Senha </DropdownItem>
                  <DropdownItem> Bancos Credenciados </DropdownItem>
                  <DropdownItem> Perguntas Frequentes </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Postos de Venda
                </DropdownToggle>
                <DropdownMenu left>
                  <DropdownItem> Estação Central </DropdownItem>
                  <DropdownItem> Posto Aeroporto </DropdownItem>
                  <DropdownItem> Posto Centro </DropdownItem>
                  <DropdownItem> Posto João Pessoa </DropdownItem>
                  <DropdownItem> Posto Lindoia </DropdownItem>
                  <DropdownItem> Posto Moinhos </DropdownItem>
                  <DropdownItem> Posto Zona Sul </DropdownItem>
                  <DropdownItem> Rodoviária Canoas </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Utilidades
                </DropdownToggle>
                <DropdownMenu left>
                  <DropdownItem>  Links Interessantes </DropdownItem>
                  <DropdownItem> A Empresa </DropdownItem>
                  <DropdownItem> Forma de Venda </DropdownItem>
                  <DropdownItem> Participar de Pesquisa </DropdownItem>
                  <DropdownItem> Fale Conosco </DropdownItem>
                  <DropdownItem> Indique o Site </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
      </>
    );
  }
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}

NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}

Breadcrumb.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  listTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  listClassName: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  'aria-label': PropTypes.string
};

BreadcrumbItem.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  active: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};