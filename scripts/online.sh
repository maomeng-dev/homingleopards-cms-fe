# go to main dir
echo "Heading to cms-fe directory => '/data/maomeng/cms-fe'"
cd /data/maomeng/cms-fe || exit

# sync code
echo "Start to sync code..."
rm -rf ./cms-fe-build.tar.gz
rm -rf ./node_modules
git pull
yarn install

# build fe files
echo "Start to build fe files..."
PUBLIC_URL=https://cdn.homingleopards.org/cms/layout/dist/ yarn build

# zip fe files
echo "Start to zip files..."
tar -czf cms-fe-build.tar.gz ./build

# remove static files
echo "Start to clean files..."
rm -rf ./build

# end build
echo "Build complete!"
echo "Result package => '/data/maomeng/cms-fe/cms-fe-build.tar.gz'"
