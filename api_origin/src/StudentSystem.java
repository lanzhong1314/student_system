import java.util.ArrayList;
import java.util.Scanner;

public class StudentSystem {
    public static void main(String[] args) {
        ArrayList<Students> list = new ArrayList<>();
        loop:
        while (true) {
            System.out.println("--------------------------------------欢迎来到生态学生管理系统----------------------------------------");
            System.out.println("1:添加学生");
            System.out.println("2:删除学生");
            System.out.println("3:修改学生");

            System.out.println("4:查询学生");


            System.out.println("5:退出");
            System.out.println("清输入您的选择");
            Scanner sc = new Scanner(System.in);
            String choose = sc.next();
            switch (choose) {
                case "1":
                    addStudent(list);
                    break;
                case "2":
                    deleteStudent(list);
                    break;
                case "3":
                    setStudent(list);
                    break;
                case "4":
                    getStudent(list);
                    break;
                case "5":
                    System.out.println("退出");
                    break loop;
                default:
                    System.out.println("没有这个选项");
            }
        }
    }

    public static void addStudent(ArrayList<Students> list) {
        Scanner sc = new Scanner(System.in);
        String id=null;
        while (true) {
            System.out.println("请输入学生的id");
            id = sc.next();
            boolean flag = contain(list, id);
            if (flag) {
                System.out.println("id已存在，请重新录入");
            } else {
                break;
            }
        }
//        System.out.println("请输入学生的id");
//        String id = sc.next();

        System.out.println("请输入学生的姓名");
        String name = sc.next();


        System.out.println("请输入学生的年龄");
        int age = sc.nextInt();


        System.out.println("请输入学生的家庭住址");
        String address = sc.next();

        Students s =new Students(id,name,age,address);
        list.add(s);



        System.out.println("学生信息添加成功");
    }

    public static void deleteStudent(ArrayList<Students> list) {
        Scanner sc=new Scanner(System.in);
        System.out.println("请输入要删除学生的id");
        String id= sc.next();
        int index = getindex(list, id);
        if (index>=0){
            list.remove(index);
            System.out.println("id为"+id+"的学生删除成功");
        }else {
            System.out.println("id不存在，删除失败");
        }
    }

    public static void setStudent(ArrayList<Students> list) {
        Scanner sc=new Scanner(System.in);
        System.out.println("请输入要修改学生的id");
        String id= sc.next();
        int index=getindex(list,id);
        if (index==-1){
            System.out.println("要修改的id不存在");
            return;
        }
        Students stu=list.get(index);

        System.out.println("请输入要修改学生的姓名");
        String newname= sc.next();
        stu.setName(newname);

        System.out.println("请输入要修改学生的年龄");
        int newage= sc.nextInt();
        stu.setAge(newage);

        System.out.println("请输入要修改学生的家庭住址");
        String newadree= sc.next();
        stu.setAddress(newadree);

        System.out.println("信息修改成功");


    }

    public static void getStudent(ArrayList<Students> list) {
        if (list.size() == 0) {
            System.out.println("当前无学生信息");
            return;
        }
        System.out.println("id\t\t姓名\t年龄\t家庭住址");
        for (int i = 0; i < list.size(); i++) {
            Students stu = list.get(i);
            System.out.println(stu.getId() + "\t" + stu.getName() + "\t" + stu.getAge() + "\t" + stu.getAddress());
        }
    }

    public static boolean contain(ArrayList<Students> list, String id) {
//        for (int i = 0; i < list.size(); i++) {
//            Students stu = list.get(i);
//            String sid = stu.getId();
//            if (sid.equals(id)) {
//                return true;
//            }
//        }
//        return false;
        return getindex(list,id)>=0;

    }

    public  static int getindex(ArrayList<Students> list, String id){
        for (int i = 0; i < list.size(); i++) {
            Students stu=list.get(i);
            String sid=stu.getId();
            if (sid.equals(id)){
                return i;
            }
        }return -1;
    }
}
