<?php
namespace Deployer;

require 'recipe/common.php';

// Project name
set('application', 'my_typo3_project');

// Project repository
set('repository', 'git@github.com:yourusername/your-repo.git');

// Hosts
host('your-hetzner-ip')
    ->user('your-username')
    ->identityFile('~/.ssh/id_rsa_ci_cd')
    ->set('deploy_path', '/var/www/html/{{application}}');

// Tasks
task('deploy', [
    'deploy:prepare',
    'deploy:vendors',
    'deploy:publish',
]);

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.
before('deploy:symlink', 'database:migrate');