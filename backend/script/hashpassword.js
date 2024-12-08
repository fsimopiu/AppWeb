import bcrypt from 'bcrypt';

const users = [
    { nom: 'Dubois', prenom: 'Pierre', mail: 'pierre.dubois@email.com', type: 1, password: 'monSuperMotDePasse123' },
    { nom: 'Dupont', prenom: 'Antoine', mail: 'antoine.dupont@email.com', type: 1, password: 'allezlUBB' },
    { nom: 'Daniel', prenom: 'Antoine', mail: 'antoine.Daniel@email.com', type: 0, password: 'magie' },
];

const hashPasswords = async () => {
    const saltRounds = 10;
    const hashedUsers = [];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        hashedUsers.push({
            ...user,
            password: hashedPassword,
        });
    }

    console.log('Utilisateurs avec mots de passe hachés :');
    console.log(hashedUsers);
};

hashPasswords();
