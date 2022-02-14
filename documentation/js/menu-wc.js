'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mutant-analyzer documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ControllersModule.html" data-type="entity-link" >ControllersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ControllersModule-9bc804c4f8ba79cb0eb62f1cff464daad1ec897e90b091847962a8da45a63b4e6f4c6d8c5b6793a1b230cf29f44d80582f1acfde8cc3bbefaee528d0b4ee0afd"' : 'data-target="#xs-controllers-links-module-ControllersModule-9bc804c4f8ba79cb0eb62f1cff464daad1ec897e90b091847962a8da45a63b4e6f4c6d8c5b6793a1b230cf29f44d80582f1acfde8cc3bbefaee528d0b4ee0afd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ControllersModule-9bc804c4f8ba79cb0eb62f1cff464daad1ec897e90b091847962a8da45a63b4e6f4c6d8c5b6793a1b230cf29f44d80582f1acfde8cc3bbefaee528d0b4ee0afd"' :
                                            'id="xs-controllers-links-module-ControllersModule-9bc804c4f8ba79cb0eb62f1cff464daad1ec897e90b091847962a8da45a63b4e6f4c6d8c5b6793a1b230cf29f44d80582f1acfde8cc3bbefaee528d0b4ee0afd"' }>
                                            <li class="link">
                                                <a href="controllers/MutantController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MutantController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/StatsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MutantCoreModule.html" data-type="entity-link" >MutantCoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MutantCoreModule-d3ae2a700ef5e06fbaa65621f12449d38630e3b40310dbaaddcffc9ee2d283ca0f5d37f71159e5f5b7cdec0c5b55224f9424e5e552ac8e2a4ea4a0f8513b4fc1"' : 'data-target="#xs-injectables-links-module-MutantCoreModule-d3ae2a700ef5e06fbaa65621f12449d38630e3b40310dbaaddcffc9ee2d283ca0f5d37f71159e5f5b7cdec0c5b55224f9424e5e552ac8e2a4ea4a0f8513b4fc1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MutantCoreModule-d3ae2a700ef5e06fbaa65621f12449d38630e3b40310dbaaddcffc9ee2d283ca0f5d37f71159e5f5b7cdec0c5b55224f9424e5e552ac8e2a4ea4a0f8513b4fc1"' :
                                        'id="xs-injectables-links-module-MutantCoreModule-d3ae2a700ef5e06fbaa65621f12449d38630e3b40310dbaaddcffc9ee2d283ca0f5d37f71159e5f5b7cdec0c5b55224f9424e5e552ac8e2a4ea4a0f8513b4fc1"' }>
                                        <li class="link">
                                            <a href="injectables/DnaMutantCoreService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DnaMutantCoreService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StatsMutantCoreService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsMutantCoreService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MutantDatabaseModule.html" data-type="entity-link" >MutantDatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MutantDatabaseModule-820f0cb5cbc5f39e8dbe70ac4b2027fb75c9fbdaef9ae123a49db0795774f7af4d8940d2e2adb23e9fa13199f86b411eeb7c74552b19b468bdb170def8629de9"' : 'data-target="#xs-injectables-links-module-MutantDatabaseModule-820f0cb5cbc5f39e8dbe70ac4b2027fb75c9fbdaef9ae123a49db0795774f7af4d8940d2e2adb23e9fa13199f86b411eeb7c74552b19b468bdb170def8629de9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MutantDatabaseModule-820f0cb5cbc5f39e8dbe70ac4b2027fb75c9fbdaef9ae123a49db0795774f7af4d8940d2e2adb23e9fa13199f86b411eeb7c74552b19b468bdb170def8629de9"' :
                                        'id="xs-injectables-links-module-MutantDatabaseModule-820f0cb5cbc5f39e8dbe70ac4b2027fb75c9fbdaef9ae123a49db0795774f7af4d8940d2e2adb23e9fa13199f86b411eeb7c74552b19b468bdb170def8629de9"' }>
                                        <li class="link">
                                            <a href="injectables/DnaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DnaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StatsServices.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsServices</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MutantEntitiesModule.html" data-type="entity-link" >MutantEntitiesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MutantEntitiesModule-d10978ad2bf4741d4a2f2b62a5bd2492f20109a3705da5c9462ed7e19add1dfe9ae3e8a1c3ac66ba6db321722ab3bf00fa9081cdb720b736b767124ffd834241"' : 'data-target="#xs-injectables-links-module-MutantEntitiesModule-d10978ad2bf4741d4a2f2b62a5bd2492f20109a3705da5c9462ed7e19add1dfe9ae3e8a1c3ac66ba6db321722ab3bf00fa9081cdb720b736b767124ffd834241"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MutantEntitiesModule-d10978ad2bf4741d4a2f2b62a5bd2492f20109a3705da5c9462ed7e19add1dfe9ae3e8a1c3ac66ba6db321722ab3bf00fa9081cdb720b736b767124ffd834241"' :
                                        'id="xs-injectables-links-module-MutantEntitiesModule-d10978ad2bf4741d4a2f2b62a5bd2492f20109a3705da5c9462ed7e19add1dfe9ae3e8a1c3ac66ba6db321722ab3bf00fa9081cdb720b736b767124ffd834241"' }>
                                        <li class="link">
                                            <a href="injectables/MutantEntitiesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MutantEntitiesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchemaModule.html" data-type="entity-link" >SchemaModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/MutantController.html" data-type="entity-link" >MutantController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StatsController.html" data-type="entity-link" >StatsController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Dna.html" data-type="entity-link" >Dna</a>
                            </li>
                            <li class="link">
                                <a href="classes/DnaNotValid.html" data-type="entity-link" >DnaNotValid</a>
                            </li>
                            <li class="link">
                                <a href="classes/DnaUtil.html" data-type="entity-link" >DnaUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/MutantRequests.html" data-type="entity-link" >MutantRequests</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatsEntity.html" data-type="entity-link" >StatsEntity</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DnaMutantCoreService.html" data-type="entity-link" >DnaMutantCoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DnaService.html" data-type="entity-link" >DnaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MutantEntitiesService.html" data-type="entity-link" >MutantEntitiesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StatsMutantCoreService.html" data-type="entity-link" >StatsMutantCoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StatsServices.html" data-type="entity-link" >StatsServices</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});