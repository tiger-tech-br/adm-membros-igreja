// =====================================
// VERIFICAR AUTENTICAÇÃO
// =====================================

function verificarAutenticacao(

    req,

    res,

    next

) {

    if (!req.session.admin) {

        return res.redirect("/login");

    }

    next();

}

// =====================================
// EXPORTAÇÃO
// =====================================

module.exports = verificarAutenticacao;