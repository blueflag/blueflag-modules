github_org=blueflag
my_repos="babel-preset-blueflag proto-blueflag-webpack eslint-config-blueflag proto-blueflag-webpack proto-blueflag-repo dr-symlink"
src_dir=./packages
for repo in $(echo $my_repos); do
  git remote add $repo git@github.com:$github_org/$repo.git
  git fetch $repo
  git read-tree --prefix=$src_dir/$repo -u $repo/master
  git add $src_dir/$repo
  git commit -m "Migrated $repo to $src_dir/$repo"
done
git push -u origin HEAD


