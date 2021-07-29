import { Theme } from "./Theme"
import { Usuario } from "./Usuario"

export class Postagem {

  public id: number

	public titulo: string

	public text: string

	public date: string

  public usuarioPostagem: Usuario

  public theme: Theme

}