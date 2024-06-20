<?php

namespace Deployer;

require 'recipe/common.php';

// Project name
set('application', 'my_typo3_project');

// Project repository
set('repository', 'git@github.com:CRONEXi/typo3.git');

// Hosts
host('157.90.119.127') // Replace 'your-hetzner-ip' with the actual IP address of your Hetzner VPS
    ->set('remote_user', 'CRONEX_STAGING') // Replace 'your-username' with the SSH username you use to log into your Hetzner VPS
    ->set('identity_file', '~/.ssh/id_rsa_ci_cd') // Path to your SSH private key
    ->set('deploy_path', '/var/www/html/{{application}}'); // Path where you want to deploy the application on your server


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
