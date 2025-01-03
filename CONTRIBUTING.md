# Greetings, contributors!

- Have a look at the [Issues](https://github.com/darkkphoenyx/task1_Todo_final/issues) section for issues that need to be solved!
- If you make a contribution, please do not forget to add your personal details to the [CONTRIBUTORS.md](https://github.com/darkkphoenyx/task1_Todo_final/blob/master/CONTRIBUTORS.md) file!

## _Technologies used_

- React
- Tailwind
- NodeJS
- Express
- PostgreSQL
- Prisma ORM

## Local setup

- Select an issue and ask to be _assigned_ to it.
- **Star** the repository.
- On the GitHub page of this repository, click on the Button,
  [Fork](https://github.com/login?return_to=%2Fdarkkphoenyx%2Ftask1_Todo_final)
- Clone **_your forked repository_** on your local machine.

  For example, run this command inside your terminal:

  ```bash
  git clone https://github.com/darkkphoenyx/task1_Todo_final.git
  ```

  Learn more about [forking](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) and [cloning a repo](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).

- Before you make any changes, [keep your fork in sync](https://www.freecodecamp.org/news/how-to-sync-your-fork-with-the-original-git-repository/) to avoid merge conflicts:

  ```bash
  git remote add upstream https://github.com/darkkphoenyx/task1_Todo_final.git
  git fetch upstream
  git pull upstream master
  git push
  ```

- If you run into a **merge conflict**, you have to resolve the conflict. There are a lot of guides online, or you can try this one by [opensource.com](https://opensource.com/article/20/4/git-merge-conflict).

- Checkout to development branch (_name your branch according to the issue name_).

  ```bash
  git checkout -b <branch-name>
  ```

- Create a folder in
  [projects directory](https://github.com/Python-World/python-mini-projects/tree/master/projects)
  according to issue name.
- Write your code, locally.
- Add the changes with `git add`, `git commit` ([write a good commit message](https://chris.beams.io/posts/git-commit/), if possible).
- I try to follow [this](https://harshkapadia2.github.io/git_basics/#_git_commit) commit structure:

  ```bash
  git add -A
  git commit -m "<your message>"
  ```

- Push the code _to your repository_.

  ```bash
  git push origin <branch-name>
  ```

- Go to the GitHub page of _your fork_, and **make a pull request**:

  Read more about pull requests on the [GitHub help pages](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

- Now wait, until one of us _reviews your Pull Request_! If there are any conflicts, you will get a notification.
