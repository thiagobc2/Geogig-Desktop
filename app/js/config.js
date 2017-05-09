function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/main/local");
    $ocLazyLoadProvider.config({debug: false});

    $stateProvider
    .state('main', {
        abstract: true,
        url: "/main",
        data: { pageTitle: 'Geodig' },
        templateUrl: "views/common/content.html",
        resolve: {
            dbGeogig:  () => db.open().then((data) =>  data),
            controller: function(dbGeogig){mydb = dbGeogig},
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                {
                    insertBefore: '#loadBefore',
                    name: 'toaster',
                    files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                },
                {
                    files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                },
                {
                    files: ['js/plugins/leaflet/plugins/wkt_to_geojson/wicket.js', 'js/plugins/leaflet/plugins/wkt_to_geojson/wicket-leaflet.js']
                },
                {
                    name: 'oitozero.ngSweetAlert',
                    files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                }
                ]);
            }
        }
    })
    .state('main.local', {
        url: "/local",
        templateUrl: "views/paginas/repositorio_local/main.html",
        controller: 'listLocal'
    })
    .state('main.view', {
        url: "/view",
        templateUrl: "views/paginas/repositorio_local/main_view.html",
        controller: 'repositorio_remoto'

    })
    .state('main.issue', {
        url: "/issue",
        templateUrl: "views/paginas/issue_tracker.html",

    })
    .state('main.remoto', {
        url: "/remoto",
        templateUrl: "views/paginas/repositorio_remoto/main.html",
        controller: 'repositorio_remoto'
    })
    .state('main.view_remoto', {
        url: "/view_remoto",
        templateUrl: "views/paginas/repositorio_remoto/main_repositorios.html",
        controller: 'repositorio_remoto'
    })
    .state('main.remoto_repo', {
        url: "/remoto_repo",
        templateUrl: "views/paginas/repositorio_remoto/main_repositorio_view.html",
        controller: 'repositorio_remoto'
    })
    .state('main.config', {
        url: "/config_user",
        templateUrl: "views/paginas/config.html",
    })
    .state('main.historico', {
        url: "/historico",
        templateUrl: "views/paginas/timeline.html",
    })
    .state('main.map', {
        url: "/map",
        templateUrl: "views/map.html"
    })
}
angular
.module('geogig-desktop')
.config(config)
.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'OPTIONS': 'Options',
    'ADD_REPOSITORIES': 'Add Repositories',
    'LOCAL_REPOSITORIES': 'Local Repositories',
    'REMOTE_REPOSITORIES': 'Remote Repositories',
    'CONFIGURATION': 'Configuration',
    'REPOSITORY_HISTORY': 'Repository History',
    'REPOSITORY': 'Repositor(y|ies)',
    'ORIGIN': 'Origin',
    'ADDRESS': 'Address',
    'LAYERS': 'Layers',
    'PULL': 'Pull',
    'PUSH': 'Push',
    'PUBLISH': 'Publish',
    'DOWNLOAD_ALL': 'Download all',
    'DOWNLOAD': 'Download',
    'DIFFERENCE': 'Difference',
    'ADD_NEW_LAYER': 'Add new layer',
    'ADD_NEW_ISSUE': 'Add new issue',
    'HISTORY': 'History',
    'ANALYZE': 'Analyze',
    'ACTIONS': 'Actions',
    'ADD': 'Add',
    'ADDED': 'Added',
    'BUG': 'Bug',
    'FIXED': 'Fixed',
    'COMMIT': 'Commit',
    'NEW': 'New',
    'FOUND': 'Found',
    'ISSUES_LC': 'issues',
    'LOCAL': 'Local',
    'LOCAL_NETWORK': 'Local network',
    'SEARCH': 'Search',
    'CLONE': 'Clone',
    'REMOTE': 'Remote',
    'CONNECTED': 'Connected',
    'CONNECTED_IN': 'Connected',
    'LATEST_ACTIVITY': 'Latest activity',
    'MOVE_TO_TRASH': 'Move to trash',
    'MARK_AS_READ': 'Mark as read',
    'SAVE': 'Save',
    'SUBMIT': 'Submit',
    'EMAIL': 'Email',
    'NAME': 'Name'
  });

  $translateProvider.translations('es', {
    'OPTIONS': 'Opções',
    'ADD_REPOSITORIES': 'Adicionar Repositorio',
    'LOCAL_REPOSITORIES': 'Repositorio Local',
    'REMOTE_REPOSITORIES': 'Repositorio Remoto',
    'CONFIGURATION': 'Configuração',
    'REPOSITORY_HISTORY': 'Repositório Historico',
    'REPOSITORY': 'Repositorio(s)',
    'ORIGIN': 'Origen',
    'ADDRESS': '',
    'LAYERS': 'Camadas',
    'PULL': '',
    'PUSH': '',
    'PUBLISH': '',
    'DOWNLOAD_ALL': 'Descargar todo',
    'DOWNLOAD': 'Descargar',
    'DIFFERENCE': 'Diferencia',
    'ADD_NEW_LAYER': 'Adicionar nova camada',
    'ADD_NEW_ISSUE': 'Adicionar nova asunto',
    'HISTORY': '',
    'ANALYZE': 'Analisar',
    'ACTIONS': 'Acciones',
    'ADD': 'Añadir',
    'ADDED': 'Sumado',
    'BUG': 'Bug',
    'FIXED': 'Fijo',
    'COMMIT': '',
    'NEW': 'Novo',
    'FOUND': 'Encontró',
    'ISSUES_LC': 'asunto',
    'LOCAL': 'Local',
    'LOCAL_NETWORK': 'Rede local',
    'SEARCH': '',
    'CLONE': '',
    'REMOTE': 'Remoto',
    'CONNECTED': 'Conectado',
    'CONNECTED_IN': 'Conectado en',
    'LATEST_ACTIVITY': 'Ultimas Atividades',
    'MOVE_TO_TRASH': 'Move to trash',
    'MARK_AS_READ': 'Mark as read',
    'SAVE': 'Salva',
    'SUBMIT': 'Enviar',
    'EMAIL': 'Email',
    'NAME': 'Nombre'
  });

  $translateProvider.preferredLanguage('en');
}])
.run(function($rootScope, $state) {
    $rootScope.$state = $state;
});
