printf "\n\n\n  Deploy in progress! \n\n\n"
npm run-script build
printf "\n\n\n❤️  Build success! ❤️\n\n\n"
printf "\n\n\n Starting to deploy in firebase"
firebase deploy --only hosting:marketplace-administrator
printf "\n\n\n❤️  Deployed to Firebase! ❤️\n\n\n"