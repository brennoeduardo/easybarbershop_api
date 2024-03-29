import User from "../../../database/schemas/user/models/User";
import { IUser, IUserCreationAttributes, IUserUpdateAttributes } from "../../../database/schemas";
import bcrypt from 'bcrypt';
import { MailOptions } from "nodemailer/lib/json-transport";
import sendMail from "../../../services/mail";
class UserService {

    async find(): Promise<User[]> {
        return await User.findAll();
    }

    async findOne(id: number): Promise<User | null> {
        return await User.findOne({ where: { id } });
    }

    async create(user: IUserCreationAttributes) {
        if(!user.name) throw new Error('Nome é obrigatório');
        if(!user.lastName) throw new Error("Sobrenome é obrigatório")
        if(!user.mail) throw new Error('E-mail é obrigatório');
        if(!user.phone) throw new Error("Telefone é obrigatório")
        if(!user.password) throw new Error('Senha é obrigatória');

        const mailExist = await User.findOne({ where: { mail: user.mail } });
        if(mailExist) throw new Error('Já existe uma conta registrada com esse e-mail.');

        const phoneExist = await User.findOne({ where: { phone: user.phone }})
        if(phoneExist) throw new Error("Já existe uma conta registra com esse telefone.")

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const userCreated = await User.create(user);

        if(userCreated){
            const payload: MailOptions = {
                to: userCreated.mail,
                subject: 'Bem-vindo ao EasyBarberShop!',
                text: `
                
                E aí, ${userCreated.name}!

                Bem-vindo ao EasyBarberShop!
                
                É bom te ver por aqui. Esperamos que curta o rolê na nossa plataforma e ache os melhores serviços de barbearia e cuidados pessoais pra você.
                
                Se precisar de uma força ou tiver qualquer dúvida, tamo junto, só dar um grito.
                
                Fica à vontade por aqui!
                
                Abraços,
                A galera do EasyBarberShop
                
                `
            }

            await sendMail(payload)
        }

        return userCreated
    }

    async delete(id: number): Promise<number> {
        return await User.destroy({ where: { id } });
    }

    async update(id: number, user: IUserUpdateAttributes): Promise<[number]> {
        return await User.update(user, { where: { id } });
    }

}

export default new UserService();