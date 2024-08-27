// // fetchProjets(): void {
// //   if (this.isBrowser) {
// //     const token = localStorage.getItem('token');

// //     if (token) {
// //       this.projectService.getAllProjets().subscribe(
// //         (response: any[]) => {  // Modifiez le type ici
// //           console.log("Réponse complète de l'API getAllProjets:", response);
// //           if (Array.isArray(response)) {  // Pas besoin de vérifier response.data
// //             this.tableProjet = response;
// //           } else {
// //             console.error("La réponse des projets n'est pas un tableau:", response);
// //             this.tableProjet = [];
// //           }
// //         },
// //         (error: any) => {
// //           console.error('Erreur lors de la récupération des projets:', error);
// //           this.tableProjet = [];
// //         }
// //       );
// //     } else {
// //       console.error('Token non trouvé dans localStorage');
// //     }
// //   }
// // }


// fetchProjets(): void {
//   // Vérifiez si le code s'exécute dans un environnement de navigateur (et non sur le serveur)
//   if (this.isBrowser) {
//     // Récupérez le token stocké dans le localStorage (pour l'authentification)
//     const token = localStorage.getItem('token');

//     // Si le token est trouvé
//     if (token) {
//       // Appelez le service pour récupérer tous les projets
//       this.projectService.getAllProjets().subscribe(
//         (response: any[]) => {  // Spécifiez que la réponse est un tableau de projets
//           console.log('Réponse complète de l'API getAllProjets:', response);

//           // Vérifiez si la réponse est un tableau (car response.data n'est pas utilisé)
//           if (Array.isArray(response)) {
//             // Si oui, assignez les projets récupérés à la variable tableProjet
//             this.tableProjet = response;
//           } else {
//             // Sinon, affichez un message d'erreur et videz la liste des projets
//             console.error('La réponse des projets n'est pas un tableau:', response);
//             this.tableProjet = [];
//           }
//         },
//         (error: any) => {
//           // En cas d'erreur lors de la récupération des projets, affichez l'erreur et videz la liste des projets
//           console.error('Erreur lors de la récupération des projets:', error);
//           this.tableProjet = [];
//         }
//       );
//     } else {
//       // Si aucun token n'est trouvé dans le localStorage, affichez un message d'erreur
//       console.error('Token non trouvé dans localStorage');
//     }
//   }
// }
